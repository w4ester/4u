// This file was auto-generated by Fern from our API Definition.

package client

import (
	core "github.com/fern-api/fern-go/internal/testdata/sdk/headers/fixtures/core"
	uuid "github.com/google/uuid"
	http "net/http"
	time "time"
)

// WithBaseURL sets the client's base URL, overriding the
// default environment, if any.
func WithBaseURL(baseURL string) core.ClientOption {
	return func(opts *core.ClientOptions) {
		opts.BaseURL = baseURL
	}
}

// WithHTTPClient uses the given HTTPClient to issue all HTTP requests.
func WithHTTPClient(httpClient core.HTTPClient) core.ClientOption {
	return func(opts *core.ClientOptions) {
		opts.HTTPClient = httpClient
	}
}

// WithHTTPHeader adds the given http.Header to all requests
// issued by the client.
func WithHTTPHeader(httpHeader http.Header) core.ClientOption {
	return func(opts *core.ClientOptions) {
		// Clone the headers so they can't be modified after the option call.
		opts.HTTPHeader = httpHeader.Clone()
	}
}

// WithCustom sets the custom auth header on every request.
func WithCustom(custom *[]byte) core.ClientOption {
	return func(opts *core.ClientOptions) {
		opts.Custom = custom
	}
}

// WithXApiName sets the xApiName header on every request.
func WithXApiName(xApiName string) core.ClientOption {
	return func(opts *core.ClientOptions) {
		opts.XApiName = xApiName
	}
}

// WithXApiId sets the xApiId header on every request.
func WithXApiId(xApiId uuid.UUID) core.ClientOption {
	return func(opts *core.ClientOptions) {
		opts.XApiId = xApiId
	}
}

// WithXApiDatetime sets the xApiDatetime header on every request.
func WithXApiDatetime(xApiDatetime time.Time) core.ClientOption {
	return func(opts *core.ClientOptions) {
		opts.XApiDatetime = xApiDatetime
	}
}

// WithXApiDate sets the xApiDate header on every request.
func WithXApiDate(xApiDate time.Time) core.ClientOption {
	return func(opts *core.ClientOptions) {
		opts.XApiDate = xApiDate
	}
}

// WithXApiBytes sets the xApiBytes header on every request.
func WithXApiBytes(xApiBytes []byte) core.ClientOption {
	return func(opts *core.ClientOptions) {
		opts.XApiBytes = xApiBytes
	}
}

// WithXApiOptionalName sets the xApiOptionalName header on every request.
func WithXApiOptionalName(xApiOptionalName *string) core.ClientOption {
	return func(opts *core.ClientOptions) {
		opts.XApiOptionalName = xApiOptionalName
	}
}

// WithXApiOptionalId sets the xApiOptionalId header on every request.
func WithXApiOptionalId(xApiOptionalId *uuid.UUID) core.ClientOption {
	return func(opts *core.ClientOptions) {
		opts.XApiOptionalId = xApiOptionalId
	}
}

// WithXApiOptionalDatetime sets the xApiOptionalDatetime header on every request.
func WithXApiOptionalDatetime(xApiOptionalDatetime *time.Time) core.ClientOption {
	return func(opts *core.ClientOptions) {
		opts.XApiOptionalDatetime = xApiOptionalDatetime
	}
}

// WithXApiOptionalDate sets the xApiOptionalDate header on every request.
func WithXApiOptionalDate(xApiOptionalDate *time.Time) core.ClientOption {
	return func(opts *core.ClientOptions) {
		opts.XApiOptionalDate = xApiOptionalDate
	}
}

// WithXApiOptionalBytes sets the xApiOptionalBytes header on every request.
func WithXApiOptionalBytes(xApiOptionalBytes *[]byte) core.ClientOption {
	return func(opts *core.ClientOptions) {
		opts.XApiOptionalBytes = xApiOptionalBytes
	}
}
