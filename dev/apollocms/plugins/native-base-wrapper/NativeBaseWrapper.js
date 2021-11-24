// React is installed in the studio and should be treated as a peer dependency
import React from 'react'
import DefaultLayoutContainer from 'part:@sanity/default-layout/root'
import {
  NativeBaseProvider,
  defaultTheme as nativeDefaultTheme,
} from '@naviothera/react-native-navio-ui'

const NativeBaseWrapper = (props) => {
  return (
    <NativeBaseProvider theme={nativeDefaultTheme}>
      <div style={{height: '100vh'}}>
        <DefaultLayoutContainer {...props} />
      </div>
    </NativeBaseProvider>
  )
}

export default NativeBaseWrapper
