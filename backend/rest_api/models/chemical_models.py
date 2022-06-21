from django.db import models
from django.contrib.auth import get_user_model
from django.utils.crypto import get_random_string

from .date_models import ManageDate

def create_id():
    return get_random_string(30)

class ChemicalName(models.Model):
    name = models.CharField(verbose_name="薬品名", max_length=255, null=False, unique=True)

    def __str__(self):
        return self.name

class ChemicalModel(models.Model):
    id = models.CharField(max_length=30, default=create_id, editable=False, primary_key=True, unique=True)
    name = models.ForeignKey(ChemicalName, on_delete=models.CASCADE, verbose_name="薬品名")
    used_amount = models.PositiveIntegerField(verbose_name='薬品使用量', default=0, null=False, blank=True)
    used_date = models.ForeignKey(ManageDate, on_delete=models.SET_NULL, null=True ,verbose_name='使用した年月')
    used_user = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True, verbose_name='使用したユーザー')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name) + '-' + str(self.used_date)