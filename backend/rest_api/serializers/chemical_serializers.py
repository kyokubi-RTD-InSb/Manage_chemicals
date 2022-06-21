from rest_framework import serializers

from .. import models

class ChemicalSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)
    updated_at = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)

    class Meta:
        model = models.ChemicalModel
        fields = '__all__'

class ChemicalNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChemicalName
        fields = '__all__'