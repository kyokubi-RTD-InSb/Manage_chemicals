from rest_framework import viewsets, generics

from .. import models
from .. import serializers


class ChemicalViewSet(viewsets.ModelViewSet):
    queryset = models.ChemicalModel.objects.all()
    serializer_class = serializers.ChemicalSerializer

    def perform_create(self, serializer):
        serializer.save(used_user=self.request.user)

class ChemicalNameViewSet(viewsets.ModelViewSet):
    queryset = models.ChemicalName.objects.all()
    serializer_class = serializers.ChemicalNameSerializer