from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework import viewsets
from django.contrib.auth import get_user_model,authenticate
from django.contrib.auth.models import User

from . models import *
from . serializers import *
from rest_framework.decorators import action
from common.response import simple_response

from . extraction import get_document_text
import base64

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class AuthViewSet(viewsets.ModelViewSet):
    queryset=get_user_model().objects.all()
    serializer_class=UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def register(Self,request):
        data=request.data.copy()

        username=data.get("username",None)
        password=data.get("password",None)
        cpassword=data.get("cpassword",None)

        if username is None:
            return simple_response({"msg":"username is required!"},status.HTTP_400_BAD_REQUEST,False)

        if password!=cpassword:
            return simple_response({"msg":"Password does not match!"},status.HTTP_400_BAD_REQUEST,False)

        try:
            user=User.objects.create_user(username=username,password=password)
            user.save()

            user_info = UserSerializer(user).data
            token=get_tokens_for_user(user)
            user_info.update(token)

            return simple_response({"data":user_info},status.HTTP_200_OK,True)
            
        except Exception as e:
            return simple_response({"msg":str(e)},status.HTTP_400_BAD_REQUEST,False)

    @action(detail=False, methods=['post'])
    def login(self,request):
        data=request.data.copy()

        username=data.get("username",None)
        password=data.get("password",None)

        try:
            user=authenticate(username=username,password=password)
            if user:
                token=get_tokens_for_user(user)
                serializer=UserSerializer(user).data
                serializer.update(token)

                return simple_response({"data":serializer},status.HTTP_200_OK,True)
            else:
                return simple_response({"msg":"Invalid Credentials !"},status.HTTP_400_BAD_REQUEST,False)

        except Exception as e:
            return simple_response({"msg":str(e)},status.HTTP_400_BAD_REQUEST,False)


class DocumentViewSet(viewsets.ModelViewSet):
    queryset=Documents.objects.all()
    serializer_class=Documenterializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def add_document(self,request):
        data=request.data.copy()

        user=request.user
        data['user']=request.user.id

        try:
            doc_file=request.FILES.get('doc_file')
            doc_binary=doc_file.read()
            
            extracted_data=get_document_text(doc_file,doc_binary)

            data['extraction_data']=extracted_data
            
            encoded=base64.b64encode(doc_binary).decode('utf-8')

            # print("*"*100)
            # print(type(encoded))
            # print(len(encoded))
            # print(doc_file.read())
            # print(doc_file)

            data['doc_base64']=encoded

            serilizer=Documenterializer(data=data)

            if serilizer.is_valid():
                serilizer.save()
                return simple_response({"data":serilizer.data},status.HTTP_200_OK,True)
            else:
                return simple_response({"msg":serilizer.errors},status.HTTP_400_BAD_REQUEST,False)



        except Exception as e:
            return simple_response({"msg":str(e)},status.HTTP_400_BAD_REQUEST,False)

    @action(detail=False, methods=['post'])
    def list_documents(self,request):
        data=request.data.copy()
        user=request.user

        try:
            docs=Documents.objects.filter(user=user)
            serilizer=Documenterializer(docs,many=True)

            return simple_response({"data":serilizer.data},status.HTTP_200_OK,True)


        except Exception as e:
            return simple_response({"msg":str(e)},status.HTTP_400_BAD_REQUEST,False)
