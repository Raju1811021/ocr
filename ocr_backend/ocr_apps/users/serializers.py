from rest_framework import serializers
from django.contrib.auth import get_user_model
from . models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=get_user_model()
        fields='__all__'

class Documenterializer(serializers.ModelSerializer):
    class Meta:
        model=Documents
        fields='__all__'