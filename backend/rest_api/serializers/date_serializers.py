from rest_framework import serializers

from .. import models

class ManageDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ManageDate
        fields = '__all__'

class YearAndMonthSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.YearAndMonth
        fields = '__all__'