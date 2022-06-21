from rest_framework import viewsets, generics

from .. import models
from .. import serializers


class ManageDateViewSet(viewsets.ModelViewSet):
    queryset = models.ManageDate.objects.all()
    serializer_class = serializers.ManageDateSerializer

class YearAndMonthViewSet(viewsets.ModelViewSet):
    queryset = models.YearAndMonth.objects.all()
    serializer_class = serializers.YearAndMonthSerializer