{z, useEffect, useMemo, useStream} = require 'zorium'
RxBehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject
RxObservable = require('rxjs/Observable').Observable
require 'rxjs/add/observable/fromPromise'

Spinner = require '../../components/spinner'
Button = require '../../components/button'
config = require '../../config'

if window?
  require './index.styl'

module.exports = $verifyEmailPage = ({model, requestsStream, router}) ->
  useEffect ->
    if window?
      disposable = requestsStream.switchMap ({req, route}) ->
        RxObservable.fromPromise model.user.verifyEmail({
          userId: route.params.userId
          tokenStr: route.params.tokenStr
        }).then ->
          isVerifiedStream.next true
        .catch (err) ->
          console.log err
          errorStream.next 'There was an error verifying your email!'
          RxObservable.of null

      .take(1)
      .subscribe()

    return ->
      disposable?.unsubscribe()
  , []

  {isVerifiedStream, errorStream} = useMemo ->
    {
      isVerifiedStream: new RxBehaviorSubject false
      errorStream: new RxBehaviorSubject null
    }
  , []

  {windowSize, isVerified, error} = useStream ->
    windowSize: model.window.getSize()
    isVerified: isVerifiedStream
    error: errorStream

  z '.p-verify-email', {
    style:
      height: "#{windowSize.height}px"
  },
    if isVerified or error
      z '.is-verified',
        error or model.l.get 'verifyEmail.isVerified'
        z '.home',
          z $button,
            text: model.l.get 'verifyEmail.tapHome'
            onclick: ->
              router.go 'home'
    else
      [
        z $spinner
        z '.loading', 'Loading...'
        router.link z 'a.stuck', {
          href: router.get 'home'
        }, 'Stuck? Tap to go home'
      ]
