# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on 'turbolinks:load', ->
  $('[data-upvote]').on 'ajax:success', (event) ->
    $(event.target.closest('h5')).find('[data-vote-count]').text(event.detail[0].votes)

  $('[data-upvote]').on 'ajax:error', (event) ->
    event.preventDefault()
    warningNode = $('<small>').addClass('text-warning').text(event.detail[0].error)
    $(event.target.closest('h5')).after(warningNode)
    setTimeout ->
      warningNode.fadeOut()
    , 2000

