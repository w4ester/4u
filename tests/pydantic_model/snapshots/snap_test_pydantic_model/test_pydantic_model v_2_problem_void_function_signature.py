# This file was auto-generated by Fern from our API Definition.

from __future__ import annotations

import typing

import pydantic
import typing_extensions

from .parameter import Parameter


class VoidFunctionSignature(pydantic.BaseModel):
    parameters: typing.List[Parameter]

    class Partial(typing_extensions.TypedDict):
        parameters: typing_extensions.NotRequired[typing.List[Parameter]]

    class Validators:
        """
        Use this class to add validators to the Pydantic model.

            @VoidFunctionSignature.Validators.root
            def validate(values: VoidFunctionSignature.Partial) -> VoidFunctionSignature.Partial:
                ...

            @VoidFunctionSignature.Validators.field("parameters")
            def validate_parameters(parameters: typing.List[Parameter], values: VoidFunctionSignature.Partial) -> typing.List[Parameter]:
                ...
        """

        _pre_validators: typing.ClassVar[typing.List[VoidFunctionSignature.Validators._RootValidator]] = []
        _post_validators: typing.ClassVar[typing.List[VoidFunctionSignature.Validators._RootValidator]] = []
        _parameters_pre_validators: typing.ClassVar[
            typing.List[VoidFunctionSignature.Validators.ParametersValidator]
        ] = []
        _parameters_post_validators: typing.ClassVar[
            typing.List[VoidFunctionSignature.Validators.ParametersValidator]
        ] = []

        @classmethod
        def root(cls, *, pre: bool = False) -> VoidFunctionSignature.Validators._RootValidator:
            def decorator(validator: typing.Any) -> typing.Any:
                if pre:
                    cls._pre_validators.append(validator)
                else:
                    cls._post_validators.append(validator)
                return validator

            return decorator

        @typing.overload  # type: ignore
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["parameters"], *, pre: bool
        ) -> typing.Callable[
            [VoidFunctionSignature.Validators.ParametersValidator], VoidFunctionSignature.Validators.ParametersValidator
        ]:
            ...

        @classmethod
        def field(cls, field_name: str, *, pre: bool = False) -> typing.Any:
            def decorator(validator: typing.Any) -> typing.Any:
                if field_name == "parameters":
                    if pre:
                        cls._parameters_pre_validators.append(validator)
                    else:
                        cls._parameters_post_validators.append(validator)
                return validator

            return decorator

        class ParametersValidator(typing_extensions.Protocol):
            def __call__(
                self, __v: typing.List[Parameter], __values: VoidFunctionSignature.Partial
            ) -> typing.List[Parameter]:
                ...

        class _RootValidator(typing_extensions.Protocol):
            def __call__(self, __values: VoidFunctionSignature.Partial) -> VoidFunctionSignature.Partial:
                ...

    @pydantic.root_validator(pre=True)
    def _pre_validate(cls, values: VoidFunctionSignature.Partial) -> VoidFunctionSignature.Partial:
        for validator in VoidFunctionSignature.Validators._pre_validators:
            values = validator(values)
        return values

    @pydantic.root_validator(pre=False)
    def _post_validate(cls, values: VoidFunctionSignature.Partial) -> VoidFunctionSignature.Partial:
        for validator in VoidFunctionSignature.Validators._post_validators:
            values = validator(values)
        return values

    @pydantic.validator("parameters", pre=True)
    def _pre_validate_parameters(
        cls, v: typing.List[Parameter], values: VoidFunctionSignature.Partial
    ) -> typing.List[Parameter]:
        for validator in VoidFunctionSignature.Validators._parameters_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("parameters", pre=False)
    def _post_validate_parameters(
        cls, v: typing.List[Parameter], values: VoidFunctionSignature.Partial
    ) -> typing.List[Parameter]:
        for validator in VoidFunctionSignature.Validators._parameters_post_validators:
            v = validator(v, values)
        return v

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {"by_alias": True, **kwargs}
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults: typing.Any = {"by_alias": True, **kwargs}
        return super().dict(**kwargs_with_defaults)

    class Config:
        frozen = True
