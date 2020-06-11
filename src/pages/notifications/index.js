/* eslint-disable
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
import { z, useContext } from 'zorium'

import $appBar from 'frontend-shared/components/app_bar'
import $buttonMenu from 'frontend-shared/components/button_menu'
import $notifications from 'frontend-shared/components/notifications'

import config from '../../config'
import context from '../../context'
import colors from '../../colors'
let $notificationsPage

if (typeof window !== 'undefined' && window !== null) {
  require('./index.styl')
}

export default $notificationsPage = function () {
  const { lang } = useContext(context)

  return z('.p-notifications',
    z($appBar, {
      title: lang.get('general.notifications'),
      style: 'primary',
      $topLeftButton:
        z($buttonMenu, { color: colors.$header500Icon })
    }),
    z($notifications))
}