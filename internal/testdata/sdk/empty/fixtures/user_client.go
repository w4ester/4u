// This file was auto-generated by Fern from our API Definition.

package api

import (
	core "github.com/fern-api/fern-go/internal/testdata/sdk/empty/fixtures/core"
	http "net/http"
)

type UserClient interface{}

func NewUserClient(opts ...core.ClientOption) UserClient {
	options := core.NewClientOptions()
	for _, opt := range opts {
		opt(options)
	}
	return &userClient{
		baseURL:    options.BaseURL,
		httpClient: options.HTTPClient,
		header:     options.ToHeader(),
	}
}

type userClient struct {
	baseURL    string
	httpClient core.HTTPClient
	header     http.Header
}
