import type { PluginDescriptor, PluginSetupFunction, VueAppInstance } from '@vue-devtools-next/schema'
import { getAppRecord } from '../core/component/general'
import { devtoolsState } from '../core/general/state'
import type { DevToolsPluginApi } from './index'

export function collectRegisteredPlugin(pluginDescriptor: PluginDescriptor, setupFn: PluginSetupFunction) {
  devtoolsState.pluginBuffer.push([pluginDescriptor, setupFn])
}

export async function registerPlugin(options: { app: VueAppInstance; api: DevToolsPluginApi }) {
  const { app, api } = options
  const plugins = devtoolsState.pluginBuffer.filter(([plugin]) => plugin.app === app)
  plugins.forEach(async ([plugin, setupFn]) => {
    const appRecord = await getAppRecord(plugin.app)
    setupFn(api)
  })
}