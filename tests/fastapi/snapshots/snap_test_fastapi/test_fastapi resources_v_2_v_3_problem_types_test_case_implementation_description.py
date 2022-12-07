# This file was auto-generated by Fern from our API Definition.

from __future__ import annotations

import typing

import pydantic
import typing_extensions

from .test_case_implementation_description_board import TestCaseImplementationDescriptionBoard


class TestCaseImplementationDescription(pydantic.BaseModel):
    boards: typing.List[TestCaseImplementationDescriptionBoard]

    class Partial(typing_extensions.TypedDict):
        boards: typing_extensions.NotRequired[typing.List[TestCaseImplementationDescriptionBoard]]

    class Validators:
        """
        Use this class to add validators to the Pydantic model.

            @TestCaseImplementationDescription.Validators.root
            def validate(values: TestCaseImplementationDescription.Partial) -> TestCaseImplementationDescription.Partial:
                ...

            @TestCaseImplementationDescription.Validators.field("boards")
            def validate_boards(boards: typing.List[TestCaseImplementationDescriptionBoard], values: TestCaseImplementationDescription.Partial) -> typing.List[TestCaseImplementationDescriptionBoard]:
                ...
        """

        _pre_validators: typing.ClassVar[typing.List[TestCaseImplementationDescription.Validators._RootValidator]] = []
        _post_validators: typing.ClassVar[typing.List[TestCaseImplementationDescription.Validators._RootValidator]] = []
        _boards_pre_validators: typing.ClassVar[
            typing.List[TestCaseImplementationDescription.Validators.BoardsValidator]
        ] = []
        _boards_post_validators: typing.ClassVar[
            typing.List[TestCaseImplementationDescription.Validators.BoardsValidator]
        ] = []

        @classmethod
        def root(cls, *, pre: bool = False) -> TestCaseImplementationDescription.Validators._RootValidator:
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
            cls, field_name: typing_extensions.Literal["boards"], *, pre: bool
        ) -> typing.Callable[
            [TestCaseImplementationDescription.Validators.BoardsValidator],
            TestCaseImplementationDescription.Validators.BoardsValidator,
        ]:
            ...

        @classmethod
        def field(cls, field_name: str, *, pre: bool = False) -> typing.Any:
            def decorator(validator: typing.Any) -> typing.Any:
                if field_name == "boards":
                    if pre:
                        cls._boards_pre_validators.append(validator)
                    else:
                        cls._boards_post_validators.append(validator)
                return validator

            return decorator

        class BoardsValidator(typing_extensions.Protocol):
            def __call__(
                self,
                __v: typing.List[TestCaseImplementationDescriptionBoard],
                __values: TestCaseImplementationDescription.Partial,
            ) -> typing.List[TestCaseImplementationDescriptionBoard]:
                ...

        class _RootValidator(typing_extensions.Protocol):
            def __call__(
                self, __values: TestCaseImplementationDescription.Partial
            ) -> TestCaseImplementationDescription.Partial:
                ...

    @pydantic.root_validator(pre=True)
    def _pre_validate(
        cls, values: TestCaseImplementationDescription.Partial
    ) -> TestCaseImplementationDescription.Partial:
        for validator in TestCaseImplementationDescription.Validators._pre_validators:
            values = validator(values)
        return values

    @pydantic.root_validator(pre=False)
    def _post_validate(
        cls, values: TestCaseImplementationDescription.Partial
    ) -> TestCaseImplementationDescription.Partial:
        for validator in TestCaseImplementationDescription.Validators._post_validators:
            values = validator(values)
        return values

    @pydantic.validator("boards", pre=True)
    def _pre_validate_boards(
        cls, v: typing.List[TestCaseImplementationDescriptionBoard], values: TestCaseImplementationDescription.Partial
    ) -> typing.List[TestCaseImplementationDescriptionBoard]:
        for validator in TestCaseImplementationDescription.Validators._boards_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("boards", pre=False)
    def _post_validate_boards(
        cls, v: typing.List[TestCaseImplementationDescriptionBoard], values: TestCaseImplementationDescription.Partial
    ) -> typing.List[TestCaseImplementationDescriptionBoard]:
        for validator in TestCaseImplementationDescription.Validators._boards_post_validators:
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
        extra = pydantic.Extra.forbid
