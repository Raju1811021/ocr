from django.db import models
from django.contrib.auth.models import User
from common.uuid_base_model import UUIDBase
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Documents(UUIDBase):
    user = models.ForeignKey(User,verbose_name=_("User"), on_delete=models.CASCADE, null=False, blank=False)
    doc_type = models.CharField(verbose_name=_("Document Type"), max_length=50,blank=False,null=False)
    doc_file=models.FileField(verbose_name=_("Documents"),upload_to='documents/',null=True)
    doc_base64 = models.TextField(verbose_name=_("Documents base64"),default="")

    status = models.PositiveSmallIntegerField(verbose_name=_("Status: 1 for Active; 0 for InActive"), default=1)
    is_deleted = models.PositiveSmallIntegerField(verbose_name=_("Status: 1 for Deleted; 0 for Not Deleted"), default=0)

    extraction_data = models.TextField(verbose_name=_("extraction_data"),blank=True,null=True)
