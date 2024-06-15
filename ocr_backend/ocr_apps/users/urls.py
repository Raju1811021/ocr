
from . views import *
from rest_framework.routers import DefaultRouter



router = DefaultRouter()

router.register(r'auth', AuthViewSet)
router.register(r'document', DocumentViewSet)

urlpatterns = router.urls