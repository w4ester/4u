# This file was auto-generated by Fern from our API Definition.

from __future__ import annotations

import typing

import pydantic
import typing_extensions

from ..commons.language import Language
from ..commons.problem_id import ProblemId
from ..commons.test_case_with_expected_result import TestCaseWithExpectedResult
from ..commons.variable_type import VariableType
from .problem_description import ProblemDescription
from .problem_files import ProblemFiles
from .variable_type_and_name import VariableTypeAndName


class ProblemInfo(pydantic.BaseModel):
    problem_id: ProblemId = pydantic.Field(alias="problemId")
    problem_description: ProblemDescription = pydantic.Field(alias="problemDescription")
    problem_name: str = pydantic.Field(alias="problemName")
    problem_version: int = pydantic.Field(alias="problemVersion")
    files: typing.Dict[Language, ProblemFiles]
    input_params: typing.List[VariableTypeAndName] = pydantic.Field(alias="inputParams")
    output_type: VariableType = pydantic.Field(alias="outputType")
    testcases: typing.List[TestCaseWithExpectedResult]
    method_name: str = pydantic.Field(alias="methodName")
    supports_custom_test_cases: bool = pydantic.Field(alias="supportsCustomTestCases")

    class Partial(typing_extensions.TypedDict):
        problem_id: typing_extensions.NotRequired[ProblemId]
        problem_description: typing_extensions.NotRequired[ProblemDescription]
        problem_name: typing_extensions.NotRequired[str]
        problem_version: typing_extensions.NotRequired[int]
        files: typing_extensions.NotRequired[typing.Dict[Language, ProblemFiles]]
        input_params: typing_extensions.NotRequired[typing.List[VariableTypeAndName]]
        output_type: typing_extensions.NotRequired[VariableType]
        testcases: typing_extensions.NotRequired[typing.List[TestCaseWithExpectedResult]]
        method_name: typing_extensions.NotRequired[str]
        supports_custom_test_cases: typing_extensions.NotRequired[bool]

    class Validators:
        """
        Use this class to add validators to the Pydantic model.

            @ProblemInfo.Validators.root
            def validate(values: ProblemInfo.Partial) -> ProblemInfo.Partial:
                ...

            @ProblemInfo.Validators.field("problem_id")
            def validate_problem_id(problem_id: ProblemId, values: ProblemInfo.Partial) -> ProblemId:
                ...

            @ProblemInfo.Validators.field("problem_description")
            def validate_problem_description(problem_description: ProblemDescription, values: ProblemInfo.Partial) -> ProblemDescription:
                ...

            @ProblemInfo.Validators.field("problem_name")
            def validate_problem_name(problem_name: str, values: ProblemInfo.Partial) -> str:
                ...

            @ProblemInfo.Validators.field("problem_version")
            def validate_problem_version(problem_version: int, values: ProblemInfo.Partial) -> int:
                ...

            @ProblemInfo.Validators.field("files")
            def validate_files(files: typing.Dict[Language, ProblemFiles], values: ProblemInfo.Partial) -> typing.Dict[Language, ProblemFiles]:
                ...

            @ProblemInfo.Validators.field("input_params")
            def validate_input_params(input_params: typing.List[VariableTypeAndName], values: ProblemInfo.Partial) -> typing.List[VariableTypeAndName]:
                ...

            @ProblemInfo.Validators.field("output_type")
            def validate_output_type(output_type: VariableType, values: ProblemInfo.Partial) -> VariableType:
                ...

            @ProblemInfo.Validators.field("testcases")
            def validate_testcases(testcases: typing.List[TestCaseWithExpectedResult], values: ProblemInfo.Partial) -> typing.List[TestCaseWithExpectedResult]:
                ...

            @ProblemInfo.Validators.field("method_name")
            def validate_method_name(method_name: str, values: ProblemInfo.Partial) -> str:
                ...

            @ProblemInfo.Validators.field("supports_custom_test_cases")
            def validate_supports_custom_test_cases(supports_custom_test_cases: bool, values: ProblemInfo.Partial) -> bool:
                ...
        """

        _pre_validators: typing.ClassVar[typing.List[ProblemInfo.Validators._RootValidator]] = []
        _post_validators: typing.ClassVar[typing.List[ProblemInfo.Validators._RootValidator]] = []
        _problem_id_pre_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.ProblemIdValidator]] = []
        _problem_id_post_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.ProblemIdValidator]] = []
        _problem_description_pre_validators: typing.ClassVar[
            typing.List[ProblemInfo.Validators.ProblemDescriptionValidator]
        ] = []
        _problem_description_post_validators: typing.ClassVar[
            typing.List[ProblemInfo.Validators.ProblemDescriptionValidator]
        ] = []
        _problem_name_pre_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.ProblemNameValidator]] = []
        _problem_name_post_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.ProblemNameValidator]] = []
        _problem_version_pre_validators: typing.ClassVar[
            typing.List[ProblemInfo.Validators.ProblemVersionValidator]
        ] = []
        _problem_version_post_validators: typing.ClassVar[
            typing.List[ProblemInfo.Validators.ProblemVersionValidator]
        ] = []
        _files_pre_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.FilesValidator]] = []
        _files_post_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.FilesValidator]] = []
        _input_params_pre_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.InputParamsValidator]] = []
        _input_params_post_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.InputParamsValidator]] = []
        _output_type_pre_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.OutputTypeValidator]] = []
        _output_type_post_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.OutputTypeValidator]] = []
        _testcases_pre_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.TestcasesValidator]] = []
        _testcases_post_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.TestcasesValidator]] = []
        _method_name_pre_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.MethodNameValidator]] = []
        _method_name_post_validators: typing.ClassVar[typing.List[ProblemInfo.Validators.MethodNameValidator]] = []
        _supports_custom_test_cases_pre_validators: typing.ClassVar[
            typing.List[ProblemInfo.Validators.SupportsCustomTestCasesValidator]
        ] = []
        _supports_custom_test_cases_post_validators: typing.ClassVar[
            typing.List[ProblemInfo.Validators.SupportsCustomTestCasesValidator]
        ] = []

        @classmethod
        def root(cls, *, pre: bool = False) -> ProblemInfo.Validators._RootValidator:
            def decorator(validator: typing.Any) -> typing.Any:
                if pre:
                    cls._pre_validators.append(validator)
                else:
                    cls._post_validators.append(validator)
                return validator

            return decorator

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["problem_id"], *, pre: bool
        ) -> typing.Callable[[ProblemInfo.Validators.ProblemIdValidator], ProblemInfo.Validators.ProblemIdValidator]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["problem_description"], *, pre: bool
        ) -> typing.Callable[
            [ProblemInfo.Validators.ProblemDescriptionValidator], ProblemInfo.Validators.ProblemDescriptionValidator
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["problem_name"], *, pre: bool
        ) -> typing.Callable[
            [ProblemInfo.Validators.ProblemNameValidator], ProblemInfo.Validators.ProblemNameValidator
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["problem_version"], *, pre: bool
        ) -> typing.Callable[
            [ProblemInfo.Validators.ProblemVersionValidator], ProblemInfo.Validators.ProblemVersionValidator
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["files"], *, pre: bool
        ) -> typing.Callable[[ProblemInfo.Validators.FilesValidator], ProblemInfo.Validators.FilesValidator]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["input_params"], *, pre: bool
        ) -> typing.Callable[
            [ProblemInfo.Validators.InputParamsValidator], ProblemInfo.Validators.InputParamsValidator
        ]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["output_type"], *, pre: bool
        ) -> typing.Callable[[ProblemInfo.Validators.OutputTypeValidator], ProblemInfo.Validators.OutputTypeValidator]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["testcases"], *, pre: bool
        ) -> typing.Callable[[ProblemInfo.Validators.TestcasesValidator], ProblemInfo.Validators.TestcasesValidator]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["method_name"], *, pre: bool
        ) -> typing.Callable[[ProblemInfo.Validators.MethodNameValidator], ProblemInfo.Validators.MethodNameValidator]:
            ...

        @typing.overload
        @classmethod
        def field(
            cls, field_name: typing_extensions.Literal["supports_custom_test_cases"], *, pre: bool
        ) -> typing.Callable[
            [ProblemInfo.Validators.SupportsCustomTestCasesValidator],
            ProblemInfo.Validators.SupportsCustomTestCasesValidator,
        ]:
            ...

        @classmethod
        def field(cls, field_name: str, *, pre: bool = False) -> typing.Any:
            def decorator(validator: typing.Any) -> typing.Any:
                if field_name == "problem_id":
                    if pre:
                        cls._problem_id_pre_validators.append(validator)
                    else:
                        cls._problem_id_post_validators.append(validator)
                if field_name == "problem_description":
                    if pre:
                        cls._problem_description_pre_validators.append(validator)
                    else:
                        cls._problem_description_post_validators.append(validator)
                if field_name == "problem_name":
                    if pre:
                        cls._problem_name_pre_validators.append(validator)
                    else:
                        cls._problem_name_post_validators.append(validator)
                if field_name == "problem_version":
                    if pre:
                        cls._problem_version_pre_validators.append(validator)
                    else:
                        cls._problem_version_post_validators.append(validator)
                if field_name == "files":
                    if pre:
                        cls._files_pre_validators.append(validator)
                    else:
                        cls._files_post_validators.append(validator)
                if field_name == "input_params":
                    if pre:
                        cls._input_params_pre_validators.append(validator)
                    else:
                        cls._input_params_post_validators.append(validator)
                if field_name == "output_type":
                    if pre:
                        cls._output_type_pre_validators.append(validator)
                    else:
                        cls._output_type_post_validators.append(validator)
                if field_name == "testcases":
                    if pre:
                        cls._testcases_pre_validators.append(validator)
                    else:
                        cls._testcases_post_validators.append(validator)
                if field_name == "method_name":
                    if pre:
                        cls._method_name_pre_validators.append(validator)
                    else:
                        cls._method_name_post_validators.append(validator)
                if field_name == "supports_custom_test_cases":
                    if pre:
                        cls._supports_custom_test_cases_pre_validators.append(validator)
                    else:
                        cls._supports_custom_test_cases_post_validators.append(validator)
                return validator

            return decorator

        class ProblemIdValidator(typing_extensions.Protocol):
            def __call__(self, __v: ProblemId, __values: ProblemInfo.Partial) -> ProblemId:
                ...

        class ProblemDescriptionValidator(typing_extensions.Protocol):
            def __call__(self, __v: ProblemDescription, __values: ProblemInfo.Partial) -> ProblemDescription:
                ...

        class ProblemNameValidator(typing_extensions.Protocol):
            def __call__(self, __v: str, __values: ProblemInfo.Partial) -> str:
                ...

        class ProblemVersionValidator(typing_extensions.Protocol):
            def __call__(self, __v: int, __values: ProblemInfo.Partial) -> int:
                ...

        class FilesValidator(typing_extensions.Protocol):
            def __call__(
                self, __v: typing.Dict[Language, ProblemFiles], __values: ProblemInfo.Partial
            ) -> typing.Dict[Language, ProblemFiles]:
                ...

        class InputParamsValidator(typing_extensions.Protocol):
            def __call__(
                self, __v: typing.List[VariableTypeAndName], __values: ProblemInfo.Partial
            ) -> typing.List[VariableTypeAndName]:
                ...

        class OutputTypeValidator(typing_extensions.Protocol):
            def __call__(self, __v: VariableType, __values: ProblemInfo.Partial) -> VariableType:
                ...

        class TestcasesValidator(typing_extensions.Protocol):
            def __call__(
                self, __v: typing.List[TestCaseWithExpectedResult], __values: ProblemInfo.Partial
            ) -> typing.List[TestCaseWithExpectedResult]:
                ...

        class MethodNameValidator(typing_extensions.Protocol):
            def __call__(self, __v: str, __values: ProblemInfo.Partial) -> str:
                ...

        class SupportsCustomTestCasesValidator(typing_extensions.Protocol):
            def __call__(self, __v: bool, __values: ProblemInfo.Partial) -> bool:
                ...

        class _RootValidator(typing_extensions.Protocol):
            def __call__(self, __values: ProblemInfo.Partial) -> ProblemInfo.Partial:
                ...

    @pydantic.root_validator(pre=True)
    def _pre_validate(cls, values: ProblemInfo.Partial) -> ProblemInfo.Partial:
        for validator in ProblemInfo.Validators._pre_validators:
            values = validator(values)
        return values

    @pydantic.root_validator(pre=False)
    def _post_validate(cls, values: ProblemInfo.Partial) -> ProblemInfo.Partial:
        for validator in ProblemInfo.Validators._post_validators:
            values = validator(values)
        return values

    @pydantic.validator("problem_id", pre=True)
    def _pre_validate_problem_id(cls, v: ProblemId, values: ProblemInfo.Partial) -> ProblemId:
        for validator in ProblemInfo.Validators._problem_id_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("problem_id", pre=False)
    def _post_validate_problem_id(cls, v: ProblemId, values: ProblemInfo.Partial) -> ProblemId:
        for validator in ProblemInfo.Validators._problem_id_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("problem_description", pre=True)
    def _pre_validate_problem_description(
        cls, v: ProblemDescription, values: ProblemInfo.Partial
    ) -> ProblemDescription:
        for validator in ProblemInfo.Validators._problem_description_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("problem_description", pre=False)
    def _post_validate_problem_description(
        cls, v: ProblemDescription, values: ProblemInfo.Partial
    ) -> ProblemDescription:
        for validator in ProblemInfo.Validators._problem_description_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("problem_name", pre=True)
    def _pre_validate_problem_name(cls, v: str, values: ProblemInfo.Partial) -> str:
        for validator in ProblemInfo.Validators._problem_name_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("problem_name", pre=False)
    def _post_validate_problem_name(cls, v: str, values: ProblemInfo.Partial) -> str:
        for validator in ProblemInfo.Validators._problem_name_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("problem_version", pre=True)
    def _pre_validate_problem_version(cls, v: int, values: ProblemInfo.Partial) -> int:
        for validator in ProblemInfo.Validators._problem_version_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("problem_version", pre=False)
    def _post_validate_problem_version(cls, v: int, values: ProblemInfo.Partial) -> int:
        for validator in ProblemInfo.Validators._problem_version_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("files", pre=True)
    def _pre_validate_files(
        cls, v: typing.Dict[Language, ProblemFiles], values: ProblemInfo.Partial
    ) -> typing.Dict[Language, ProblemFiles]:
        for validator in ProblemInfo.Validators._files_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("files", pre=False)
    def _post_validate_files(
        cls, v: typing.Dict[Language, ProblemFiles], values: ProblemInfo.Partial
    ) -> typing.Dict[Language, ProblemFiles]:
        for validator in ProblemInfo.Validators._files_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("input_params", pre=True)
    def _pre_validate_input_params(
        cls, v: typing.List[VariableTypeAndName], values: ProblemInfo.Partial
    ) -> typing.List[VariableTypeAndName]:
        for validator in ProblemInfo.Validators._input_params_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("input_params", pre=False)
    def _post_validate_input_params(
        cls, v: typing.List[VariableTypeAndName], values: ProblemInfo.Partial
    ) -> typing.List[VariableTypeAndName]:
        for validator in ProblemInfo.Validators._input_params_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("output_type", pre=True)
    def _pre_validate_output_type(cls, v: VariableType, values: ProblemInfo.Partial) -> VariableType:
        for validator in ProblemInfo.Validators._output_type_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("output_type", pre=False)
    def _post_validate_output_type(cls, v: VariableType, values: ProblemInfo.Partial) -> VariableType:
        for validator in ProblemInfo.Validators._output_type_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("testcases", pre=True)
    def _pre_validate_testcases(
        cls, v: typing.List[TestCaseWithExpectedResult], values: ProblemInfo.Partial
    ) -> typing.List[TestCaseWithExpectedResult]:
        for validator in ProblemInfo.Validators._testcases_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("testcases", pre=False)
    def _post_validate_testcases(
        cls, v: typing.List[TestCaseWithExpectedResult], values: ProblemInfo.Partial
    ) -> typing.List[TestCaseWithExpectedResult]:
        for validator in ProblemInfo.Validators._testcases_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("method_name", pre=True)
    def _pre_validate_method_name(cls, v: str, values: ProblemInfo.Partial) -> str:
        for validator in ProblemInfo.Validators._method_name_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("method_name", pre=False)
    def _post_validate_method_name(cls, v: str, values: ProblemInfo.Partial) -> str:
        for validator in ProblemInfo.Validators._method_name_post_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("supports_custom_test_cases", pre=True)
    def _pre_validate_supports_custom_test_cases(cls, v: bool, values: ProblemInfo.Partial) -> bool:
        for validator in ProblemInfo.Validators._supports_custom_test_cases_pre_validators:
            v = validator(v, values)
        return v

    @pydantic.validator("supports_custom_test_cases", pre=False)
    def _post_validate_supports_custom_test_cases(cls, v: bool, values: ProblemInfo.Partial) -> bool:
        for validator in ProblemInfo.Validators._supports_custom_test_cases_post_validators:
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
        allow_population_by_field_name = True
