# This file was auto-generated by Fern from our API Definition.

import typing
import urllib.parse
from json.decoder import JSONDecodeError

from .....core.api_error import ApiError
from .....core.client_wrapper import AsyncClientWrapper, SyncClientWrapper
from .....core.jsonable_encoder import jsonable_encoder
from .....core.remove_none_from_dict import remove_none_from_dict
from .....core.request_options import RequestOptions
from ....types.resources.object.types.nested_object_with_optional_field import NestedObjectWithOptionalField
from ....types.resources.object.types.nested_object_with_required_field import NestedObjectWithRequiredField
from ....types.resources.object.types.object_with_map_of_map import ObjectWithMapOfMap
from ....types.resources.object.types.object_with_optional_field import ObjectWithOptionalField
from ....types.resources.object.types.object_with_required_field import ObjectWithRequiredField

try:
    import pydantic.v1 as pydantic  # type: ignore
except ImportError:
    import pydantic  # type: ignore

# this is used as the default value for optional parameters
OMIT = typing.cast(typing.Any, ...)


class ObjectClient:
    def __init__(self, *, client_wrapper: SyncClientWrapper):
        self._client_wrapper = client_wrapper

    def get_and_return_with_optional_field(
        self, *, request: ObjectWithOptionalField, request_options: typing.Optional[RequestOptions] = None
    ) -> ObjectWithOptionalField:
        """
        Parameters:
            - request: ObjectWithOptionalField.

            - request_options: typing.Optional[RequestOptions]. Request-specific configuration.
        ---
        import datetime
        import uuid

        from seed.client import SeedExhaustive
        from seed.resources.types import ObjectWithOptionalField

        client = SeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )
        client.endpoints.object.get_and_return_with_optional_field(
            request=ObjectWithOptionalField(
                string="string",
                integer=0,
                long=99999,
                double=1.0,
                bool=True,
                datetime=datetime.datetime.fromisoformat(
                    "2024-01-01 00:00:00+00:00",
                ),
                date=datetime.date.fromisoformat(
                    "2024-01-01",
                ),
                uuid=uuid.UUID(
                    "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                ),
                base_64="SGVsbG8gV29ybGQ=",
                list=["string"],
                set=["string"],
                map={0: "string"},
            ),
        )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", "object/get-and-return-with-optional-field"
            ),
            params=jsonable_encoder(
                request_options.get("additional_query_parameters") if request_options is not None else None
            ),
            json=jsonable_encoder(request)
            if request_options is None or request_options.get("additional_body_parameters") is None
            else {
                **jsonable_encoder(request),
                **(jsonable_encoder(remove_none_from_dict(request_options.get("additional_body_parameters", {})))),
            },
            headers=jsonable_encoder(
                remove_none_from_dict(
                    {
                        **self._client_wrapper.get_headers(),
                        **(request_options.get("additional_headers", {}) if request_options is not None else {}),
                    }
                )
            ),
            timeout=request_options.get("timeout_in_seconds")
            if request_options is not None and request_options.get("timeout_in_seconds") is not None
            else None,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(ObjectWithOptionalField, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def get_and_return_with_required_field(
        self, *, request: ObjectWithRequiredField, request_options: typing.Optional[RequestOptions] = None
    ) -> ObjectWithRequiredField:
        """
        Parameters:
            - request: ObjectWithRequiredField.

            - request_options: typing.Optional[RequestOptions]. Request-specific configuration.
        ---
        from seed.client import SeedExhaustive
        from seed.resources.types import ObjectWithRequiredField

        client = SeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )
        client.endpoints.object.get_and_return_with_required_field(
            request=ObjectWithRequiredField(
                string="string",
            ),
        )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", "object/get-and-return-with-required-field"
            ),
            params=jsonable_encoder(
                request_options.get("additional_query_parameters") if request_options is not None else None
            ),
            json=jsonable_encoder(request)
            if request_options is None or request_options.get("additional_body_parameters") is None
            else {
                **jsonable_encoder(request),
                **(jsonable_encoder(remove_none_from_dict(request_options.get("additional_body_parameters", {})))),
            },
            headers=jsonable_encoder(
                remove_none_from_dict(
                    {
                        **self._client_wrapper.get_headers(),
                        **(request_options.get("additional_headers", {}) if request_options is not None else {}),
                    }
                )
            ),
            timeout=request_options.get("timeout_in_seconds")
            if request_options is not None and request_options.get("timeout_in_seconds") is not None
            else None,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(ObjectWithRequiredField, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def get_and_return_with_map_of_map(
        self, *, request: ObjectWithMapOfMap, request_options: typing.Optional[RequestOptions] = None
    ) -> ObjectWithMapOfMap:
        """
        Parameters:
            - request: ObjectWithMapOfMap.

            - request_options: typing.Optional[RequestOptions]. Request-specific configuration.
        ---
        from seed.client import SeedExhaustive
        from seed.resources.types import ObjectWithMapOfMap

        client = SeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )
        client.endpoints.object.get_and_return_with_map_of_map(
            request=ObjectWithMapOfMap(
                map={"string": {"string": "string"}},
            ),
        )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "object/get-and-return-with-map-of-map"),
            params=jsonable_encoder(
                request_options.get("additional_query_parameters") if request_options is not None else None
            ),
            json=jsonable_encoder(request)
            if request_options is None or request_options.get("additional_body_parameters") is None
            else {
                **jsonable_encoder(request),
                **(jsonable_encoder(remove_none_from_dict(request_options.get("additional_body_parameters", {})))),
            },
            headers=jsonable_encoder(
                remove_none_from_dict(
                    {
                        **self._client_wrapper.get_headers(),
                        **(request_options.get("additional_headers", {}) if request_options is not None else {}),
                    }
                )
            ),
            timeout=request_options.get("timeout_in_seconds")
            if request_options is not None and request_options.get("timeout_in_seconds") is not None
            else None,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(ObjectWithMapOfMap, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def get_and_return_nested_with_optional_field(
        self, *, request: NestedObjectWithOptionalField, request_options: typing.Optional[RequestOptions] = None
    ) -> NestedObjectWithOptionalField:
        """
        Parameters:
            - request: NestedObjectWithOptionalField.

            - request_options: typing.Optional[RequestOptions]. Request-specific configuration.
        ---
        import datetime
        import uuid

        from seed.client import SeedExhaustive
        from seed.resources.types import (
            NestedObjectWithOptionalField,
            ObjectWithOptionalField,
        )

        client = SeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )
        client.endpoints.object.get_and_return_nested_with_optional_field(
            request=NestedObjectWithOptionalField(
                string="string",
                nested_object=ObjectWithOptionalField(
                    string="string",
                    integer=0,
                    long=99999,
                    double=1.0,
                    bool=True,
                    datetime=datetime.datetime.fromisoformat(
                        "2024-01-01 00:00:00+00:00",
                    ),
                    date=datetime.date.fromisoformat(
                        "2024-01-01",
                    ),
                    uuid=uuid.UUID(
                        "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                    ),
                    base_64="SGVsbG8gV29ybGQ=",
                    list=["string"],
                    set=["string"],
                    map={0: "string"},
                ),
            ),
        )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", "object/get-and-return-nested-with-optional-field"
            ),
            params=jsonable_encoder(
                request_options.get("additional_query_parameters") if request_options is not None else None
            ),
            json=jsonable_encoder(request)
            if request_options is None or request_options.get("additional_body_parameters") is None
            else {
                **jsonable_encoder(request),
                **(jsonable_encoder(remove_none_from_dict(request_options.get("additional_body_parameters", {})))),
            },
            headers=jsonable_encoder(
                remove_none_from_dict(
                    {
                        **self._client_wrapper.get_headers(),
                        **(request_options.get("additional_headers", {}) if request_options is not None else {}),
                    }
                )
            ),
            timeout=request_options.get("timeout_in_seconds")
            if request_options is not None and request_options.get("timeout_in_seconds") is not None
            else None,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(NestedObjectWithOptionalField, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def get_and_return_nested_with_required_field(
        self, *, request: NestedObjectWithRequiredField, request_options: typing.Optional[RequestOptions] = None
    ) -> NestedObjectWithRequiredField:
        """
        Parameters:
            - request: NestedObjectWithRequiredField.

            - request_options: typing.Optional[RequestOptions]. Request-specific configuration.
        ---
        import datetime
        import uuid

        from seed.client import SeedExhaustive
        from seed.resources.types import (
            NestedObjectWithRequiredField,
            ObjectWithOptionalField,
        )

        client = SeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )
        client.endpoints.object.get_and_return_nested_with_required_field(
            request=NestedObjectWithRequiredField(
                string="string",
                nested_object=ObjectWithOptionalField(
                    string="string",
                    integer=0,
                    long=99999,
                    double=1.0,
                    bool=True,
                    datetime=datetime.datetime.fromisoformat(
                        "2024-01-01 00:00:00+00:00",
                    ),
                    date=datetime.date.fromisoformat(
                        "2024-01-01",
                    ),
                    uuid=uuid.UUID(
                        "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                    ),
                    base_64="SGVsbG8gV29ybGQ=",
                    list=["string"],
                    set=["string"],
                    map={0: "string"},
                ),
            ),
        )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", "object/get-and-return-nested-with-required-field"
            ),
            params=jsonable_encoder(
                request_options.get("additional_query_parameters") if request_options is not None else None
            ),
            json=jsonable_encoder(request)
            if request_options is None or request_options.get("additional_body_parameters") is None
            else {
                **jsonable_encoder(request),
                **(jsonable_encoder(remove_none_from_dict(request_options.get("additional_body_parameters", {})))),
            },
            headers=jsonable_encoder(
                remove_none_from_dict(
                    {
                        **self._client_wrapper.get_headers(),
                        **(request_options.get("additional_headers", {}) if request_options is not None else {}),
                    }
                )
            ),
            timeout=request_options.get("timeout_in_seconds")
            if request_options is not None and request_options.get("timeout_in_seconds") is not None
            else None,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(NestedObjectWithRequiredField, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def get_and_return_nested_with_required_field_as_list(
        self,
        *,
        request: typing.Sequence[NestedObjectWithRequiredField],
        request_options: typing.Optional[RequestOptions] = None,
    ) -> NestedObjectWithRequiredField:
        """
        Parameters:
            - request: typing.Sequence[NestedObjectWithRequiredField].

            - request_options: typing.Optional[RequestOptions]. Request-specific configuration.
        ---
        import datetime
        import uuid

        from seed.client import SeedExhaustive
        from seed.resources.types import (
            NestedObjectWithRequiredField,
            ObjectWithOptionalField,
        )

        client = SeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )
        client.endpoints.object.get_and_return_nested_with_required_field_as_list(
            request=[
                NestedObjectWithRequiredField(
                    string="string",
                    nested_object=ObjectWithOptionalField(
                        string="string",
                        integer=0,
                        long=99999,
                        double=1.0,
                        bool=True,
                        datetime=datetime.datetime.fromisoformat(
                            "2024-01-01 00:00:00+00:00",
                        ),
                        date=datetime.date.fromisoformat(
                            "2024-01-01",
                        ),
                        uuid=uuid.UUID(
                            "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                        ),
                        base_64="SGVsbG8gV29ybGQ=",
                        list=["string"],
                        set=["string"],
                        map={0: "string"},
                    ),
                )
            ],
        )
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", "object/get-and-return-nested-with-required-field"
            ),
            params=jsonable_encoder(
                request_options.get("additional_query_parameters") if request_options is not None else None
            ),
            json=jsonable_encoder(request)
            if request_options is None or request_options.get("additional_body_parameters") is None
            else {
                **jsonable_encoder(request),
                **(jsonable_encoder(remove_none_from_dict(request_options.get("additional_body_parameters", {})))),
            },
            headers=jsonable_encoder(
                remove_none_from_dict(
                    {
                        **self._client_wrapper.get_headers(),
                        **(request_options.get("additional_headers", {}) if request_options is not None else {}),
                    }
                )
            ),
            timeout=request_options.get("timeout_in_seconds")
            if request_options is not None and request_options.get("timeout_in_seconds") is not None
            else None,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(NestedObjectWithRequiredField, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)


class AsyncObjectClient:
    def __init__(self, *, client_wrapper: AsyncClientWrapper):
        self._client_wrapper = client_wrapper

    async def get_and_return_with_optional_field(
        self, *, request: ObjectWithOptionalField, request_options: typing.Optional[RequestOptions] = None
    ) -> ObjectWithOptionalField:
        """
        Parameters:
            - request: ObjectWithOptionalField.

            - request_options: typing.Optional[RequestOptions]. Request-specific configuration.
        ---
        import datetime
        import uuid

        from seed.client import AsyncSeedExhaustive
        from seed.resources.types import ObjectWithOptionalField

        client = AsyncSeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )
        await client.endpoints.object.get_and_return_with_optional_field(
            request=ObjectWithOptionalField(
                string="string",
                integer=0,
                long=99999,
                double=1.0,
                bool=True,
                datetime=datetime.datetime.fromisoformat(
                    "2024-01-01 00:00:00+00:00",
                ),
                date=datetime.date.fromisoformat(
                    "2024-01-01",
                ),
                uuid=uuid.UUID(
                    "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                ),
                base_64="SGVsbG8gV29ybGQ=",
                list=["string"],
                set=["string"],
                map={0: "string"},
            ),
        )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", "object/get-and-return-with-optional-field"
            ),
            params=jsonable_encoder(
                request_options.get("additional_query_parameters") if request_options is not None else None
            ),
            json=jsonable_encoder(request)
            if request_options is None or request_options.get("additional_body_parameters") is None
            else {
                **jsonable_encoder(request),
                **(jsonable_encoder(remove_none_from_dict(request_options.get("additional_body_parameters", {})))),
            },
            headers=jsonable_encoder(
                remove_none_from_dict(
                    {
                        **self._client_wrapper.get_headers(),
                        **(request_options.get("additional_headers", {}) if request_options is not None else {}),
                    }
                )
            ),
            timeout=request_options.get("timeout_in_seconds")
            if request_options is not None and request_options.get("timeout_in_seconds") is not None
            else None,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(ObjectWithOptionalField, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def get_and_return_with_required_field(
        self, *, request: ObjectWithRequiredField, request_options: typing.Optional[RequestOptions] = None
    ) -> ObjectWithRequiredField:
        """
        Parameters:
            - request: ObjectWithRequiredField.

            - request_options: typing.Optional[RequestOptions]. Request-specific configuration.
        ---
        from seed.client import AsyncSeedExhaustive
        from seed.resources.types import ObjectWithRequiredField

        client = AsyncSeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )
        await client.endpoints.object.get_and_return_with_required_field(
            request=ObjectWithRequiredField(
                string="string",
            ),
        )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", "object/get-and-return-with-required-field"
            ),
            params=jsonable_encoder(
                request_options.get("additional_query_parameters") if request_options is not None else None
            ),
            json=jsonable_encoder(request)
            if request_options is None or request_options.get("additional_body_parameters") is None
            else {
                **jsonable_encoder(request),
                **(jsonable_encoder(remove_none_from_dict(request_options.get("additional_body_parameters", {})))),
            },
            headers=jsonable_encoder(
                remove_none_from_dict(
                    {
                        **self._client_wrapper.get_headers(),
                        **(request_options.get("additional_headers", {}) if request_options is not None else {}),
                    }
                )
            ),
            timeout=request_options.get("timeout_in_seconds")
            if request_options is not None and request_options.get("timeout_in_seconds") is not None
            else None,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(ObjectWithRequiredField, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def get_and_return_with_map_of_map(
        self, *, request: ObjectWithMapOfMap, request_options: typing.Optional[RequestOptions] = None
    ) -> ObjectWithMapOfMap:
        """
        Parameters:
            - request: ObjectWithMapOfMap.

            - request_options: typing.Optional[RequestOptions]. Request-specific configuration.
        ---
        from seed.client import AsyncSeedExhaustive
        from seed.resources.types import ObjectWithMapOfMap

        client = AsyncSeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )
        await client.endpoints.object.get_and_return_with_map_of_map(
            request=ObjectWithMapOfMap(
                map={"string": {"string": "string"}},
            ),
        )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "object/get-and-return-with-map-of-map"),
            params=jsonable_encoder(
                request_options.get("additional_query_parameters") if request_options is not None else None
            ),
            json=jsonable_encoder(request)
            if request_options is None or request_options.get("additional_body_parameters") is None
            else {
                **jsonable_encoder(request),
                **(jsonable_encoder(remove_none_from_dict(request_options.get("additional_body_parameters", {})))),
            },
            headers=jsonable_encoder(
                remove_none_from_dict(
                    {
                        **self._client_wrapper.get_headers(),
                        **(request_options.get("additional_headers", {}) if request_options is not None else {}),
                    }
                )
            ),
            timeout=request_options.get("timeout_in_seconds")
            if request_options is not None and request_options.get("timeout_in_seconds") is not None
            else None,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(ObjectWithMapOfMap, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def get_and_return_nested_with_optional_field(
        self, *, request: NestedObjectWithOptionalField, request_options: typing.Optional[RequestOptions] = None
    ) -> NestedObjectWithOptionalField:
        """
        Parameters:
            - request: NestedObjectWithOptionalField.

            - request_options: typing.Optional[RequestOptions]. Request-specific configuration.
        ---
        import datetime
        import uuid

        from seed.client import AsyncSeedExhaustive
        from seed.resources.types import (
            NestedObjectWithOptionalField,
            ObjectWithOptionalField,
        )

        client = AsyncSeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )
        await client.endpoints.object.get_and_return_nested_with_optional_field(
            request=NestedObjectWithOptionalField(
                string="string",
                nested_object=ObjectWithOptionalField(
                    string="string",
                    integer=0,
                    long=99999,
                    double=1.0,
                    bool=True,
                    datetime=datetime.datetime.fromisoformat(
                        "2024-01-01 00:00:00+00:00",
                    ),
                    date=datetime.date.fromisoformat(
                        "2024-01-01",
                    ),
                    uuid=uuid.UUID(
                        "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                    ),
                    base_64="SGVsbG8gV29ybGQ=",
                    list=["string"],
                    set=["string"],
                    map={0: "string"},
                ),
            ),
        )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", "object/get-and-return-nested-with-optional-field"
            ),
            params=jsonable_encoder(
                request_options.get("additional_query_parameters") if request_options is not None else None
            ),
            json=jsonable_encoder(request)
            if request_options is None or request_options.get("additional_body_parameters") is None
            else {
                **jsonable_encoder(request),
                **(jsonable_encoder(remove_none_from_dict(request_options.get("additional_body_parameters", {})))),
            },
            headers=jsonable_encoder(
                remove_none_from_dict(
                    {
                        **self._client_wrapper.get_headers(),
                        **(request_options.get("additional_headers", {}) if request_options is not None else {}),
                    }
                )
            ),
            timeout=request_options.get("timeout_in_seconds")
            if request_options is not None and request_options.get("timeout_in_seconds") is not None
            else None,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(NestedObjectWithOptionalField, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def get_and_return_nested_with_required_field(
        self, *, request: NestedObjectWithRequiredField, request_options: typing.Optional[RequestOptions] = None
    ) -> NestedObjectWithRequiredField:
        """
        Parameters:
            - request: NestedObjectWithRequiredField.

            - request_options: typing.Optional[RequestOptions]. Request-specific configuration.
        ---
        import datetime
        import uuid

        from seed.client import AsyncSeedExhaustive
        from seed.resources.types import (
            NestedObjectWithRequiredField,
            ObjectWithOptionalField,
        )

        client = AsyncSeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )
        await client.endpoints.object.get_and_return_nested_with_required_field(
            request=NestedObjectWithRequiredField(
                string="string",
                nested_object=ObjectWithOptionalField(
                    string="string",
                    integer=0,
                    long=99999,
                    double=1.0,
                    bool=True,
                    datetime=datetime.datetime.fromisoformat(
                        "2024-01-01 00:00:00+00:00",
                    ),
                    date=datetime.date.fromisoformat(
                        "2024-01-01",
                    ),
                    uuid=uuid.UUID(
                        "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                    ),
                    base_64="SGVsbG8gV29ybGQ=",
                    list=["string"],
                    set=["string"],
                    map={0: "string"},
                ),
            ),
        )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", "object/get-and-return-nested-with-required-field"
            ),
            params=jsonable_encoder(
                request_options.get("additional_query_parameters") if request_options is not None else None
            ),
            json=jsonable_encoder(request)
            if request_options is None or request_options.get("additional_body_parameters") is None
            else {
                **jsonable_encoder(request),
                **(jsonable_encoder(remove_none_from_dict(request_options.get("additional_body_parameters", {})))),
            },
            headers=jsonable_encoder(
                remove_none_from_dict(
                    {
                        **self._client_wrapper.get_headers(),
                        **(request_options.get("additional_headers", {}) if request_options is not None else {}),
                    }
                )
            ),
            timeout=request_options.get("timeout_in_seconds")
            if request_options is not None and request_options.get("timeout_in_seconds") is not None
            else None,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(NestedObjectWithRequiredField, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def get_and_return_nested_with_required_field_as_list(
        self,
        *,
        request: typing.Sequence[NestedObjectWithRequiredField],
        request_options: typing.Optional[RequestOptions] = None,
    ) -> NestedObjectWithRequiredField:
        """
        Parameters:
            - request: typing.Sequence[NestedObjectWithRequiredField].

            - request_options: typing.Optional[RequestOptions]. Request-specific configuration.
        ---
        import datetime
        import uuid

        from seed.client import AsyncSeedExhaustive
        from seed.resources.types import (
            NestedObjectWithRequiredField,
            ObjectWithOptionalField,
        )

        client = AsyncSeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )
        await client.endpoints.object.get_and_return_nested_with_required_field_as_list(
            request=[
                NestedObjectWithRequiredField(
                    string="string",
                    nested_object=ObjectWithOptionalField(
                        string="string",
                        integer=0,
                        long=99999,
                        double=1.0,
                        bool=True,
                        datetime=datetime.datetime.fromisoformat(
                            "2024-01-01 00:00:00+00:00",
                        ),
                        date=datetime.date.fromisoformat(
                            "2024-01-01",
                        ),
                        uuid=uuid.UUID(
                            "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                        ),
                        base_64="SGVsbG8gV29ybGQ=",
                        list=["string"],
                        set=["string"],
                        map={0: "string"},
                    ),
                )
            ],
        )
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(
                f"{self._client_wrapper.get_base_url()}/", "object/get-and-return-nested-with-required-field"
            ),
            params=jsonable_encoder(
                request_options.get("additional_query_parameters") if request_options is not None else None
            ),
            json=jsonable_encoder(request)
            if request_options is None or request_options.get("additional_body_parameters") is None
            else {
                **jsonable_encoder(request),
                **(jsonable_encoder(remove_none_from_dict(request_options.get("additional_body_parameters", {})))),
            },
            headers=jsonable_encoder(
                remove_none_from_dict(
                    {
                        **self._client_wrapper.get_headers(),
                        **(request_options.get("additional_headers", {}) if request_options is not None else {}),
                    }
                )
            ),
            timeout=request_options.get("timeout_in_seconds")
            if request_options is not None and request_options.get("timeout_in_seconds") is not None
            else None,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(NestedObjectWithRequiredField, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)
