// Generated by Fern. Do not edit.

package core

import (
	http "net/http"
)

type ClientOption func(*ClientOptions)

type ClientOptions struct {
	Bearer string
}

func ClientWithAuthBearer(bearer string) ClientOption {
	return func(opts *ClientOptions) {
		opts.Bearer = bearer
	}
}

func (c *ClientOptions) ToHeader() http.Header {
	header := make(http.Header)
	header.Set("Authorization", "Bearer "+c.Bearer)
	return header
}
