// This file was auto-generated by Fern from our API Definition.

package audiences

import (
	fmt "fmt"
	core "github.com/audiences/fern/core"
)

type FindRequest struct {
	OptionalString  OptionalString `query:"optionalString"`
	PublicProperty  *string        `json:"publicProperty,omitempty" url:"publicProperty,omitempty"`
	PrivateProperty *int           `json:"privateProperty,omitempty" url:"privateProperty,omitempty"`
}

type ImportingType struct {
	Imported Imported `json:"imported" url:"imported"`
}

func (i *ImportingType) String() string {
	if value, err := core.StringifyJSON(i); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", i)
}

type OptionalString = *string
