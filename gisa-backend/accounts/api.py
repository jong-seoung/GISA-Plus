from accounts.models import Manager
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.request import Request
from rest_framework.response import Response


@api_view(["GET"])
@permission_classes([])
@renderer_classes([JSONRenderer])
def status(request: Request) -> Response:
    if request.user.is_authenticated:
        manager = Manager.objects.filter(user=request.user)
        managed = [category.category.name for category in manager]
    else:
        managed = []

    messages = [{"message": message.message, "tags": message.tags} for message in request._messages]

    return Response(
        {
            "is_authenticated": request.user.is_authenticated,
            "username": request.user.username or "anonymous",
            "managed": managed,
            "messages": messages,
        }
    )
