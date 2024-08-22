# accounts/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import SignupSerializer, LoginSerializer
from django.contrib.auth import login as auth_login, logout as auth_logout

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            auth_login(request, user)  # 회원가입 후 자동 로그인
            return Response({"message": "회원가입 성공 및 자동 로그인 완료"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            auth_login(request, user)
            return Response({"message": "로그인 성공"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        auth_logout(request)
        return Response({"message": "로그아웃 완료"}, status=status.HTTP_200_OK)
