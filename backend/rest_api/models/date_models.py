from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError
from datetime import datetime

def get_year():
    year = datetime.now().year
    return year

def get_month():
    month = datetime.now().month
    return month

def get_day():
    day = datetime.now().day
    return day

class YearAndMonth(models.Model):
    create_year = models.PositiveIntegerField(verbose_name='対象の西暦', default=get_year, validators=(MinValueValidator(2000),))
    create_month = models.PositiveIntegerField(verbose_name='対象の月', default=get_month, validators=(MinValueValidator(1), MaxValueValidator(12)))
    class Meta:
        'same date is not registerd'
        constraints = [
            models.UniqueConstraint(
                fields=["create_year", "create_month"],
                name='unique_year_month',
            )
        ]
    
    def __str__(self):
        return f'{str(self.create_year)}-{str(self.create_month)}'
    

class ManageDate(models.Model):
    year_and_month = models.ForeignKey(YearAndMonth, on_delete=models.SET_NULL, null=True)
    create_day = models.PositiveIntegerField(verbose_name='対象の日', default=get_day, validators=(MinValueValidator(1), MaxValueValidator(31)))

    def validate_unique(self, *args, **kwargs):
        super().validate_unique(*args, **kwargs)
        if self.__class__.objects.filter(year_and_month=self.year_and_month, create_day=self.create_day).exists():
            raise ValidationError(
                message='YearAndMonth with this create_day already exists.',
                code='unique_together',
            )

    def __str__(self):
        return str(self.year_and_month) + '-' + str(self.create_day)