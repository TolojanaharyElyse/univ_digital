from django.urls import path
from .views import StudentList

urlpatterns = [
    path('students/', StudentList.as_view(), name='student-list'),
    path('students/<str:pk>/', StudentList.as_view(), name='student-detail'),
    # path('studend/<str:pk>/', StudentList.as_view(), name='delete_student'),
    
]