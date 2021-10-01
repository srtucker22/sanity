// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import {LayerProvider, studioTheme, ThemeProvider, ToastProvider} from '@sanity/ui'
import Schema from '@sanity/schema'
import {PortableTextInputProps} from '../../PortableTextInput'
import {TestInput} from '../../__workshop__/TestInput'
import {portableTextType} from './schema'

const schema = Schema.compile({
  name: 'test',
  types: [portableTextType],
})

const value = undefined
const noop = () => {
  // noop
}
const subscribe = () => noop

function renderInput(props: Partial<PortableTextInputProps> = {}) {
  const onBlur = jest.fn()
  const onFocus = jest.fn()
  const onChange = jest.fn()

  const {queryByTestId} = render(
    <ThemeProvider scheme="light" theme={studioTheme}>
      <LayerProvider>
        <ToastProvider>
          <TestInput
            focusPath={[]}
            type={schema.get('body')}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            markers={[]}
            level={0}
            readOnly={false}
            presence={[]}
            subscribe={subscribe}
            value={value}
            data-test-id="input"
            schema={schema}
            {...(props || {})}
          />
        </ToastProvider>
      </LayerProvider>
    </ThemeProvider>
  )

  const input = queryByTestId('portable-text-input')

  return {onChange, onFocus, input}
}

test('does not emit onChange after invalid value has been typed', () => {
  const {input, onFocus} = renderInput()
  fireEvent.focus(input)

  expect(onFocus.mock.calls.length).toBe(1)
})
