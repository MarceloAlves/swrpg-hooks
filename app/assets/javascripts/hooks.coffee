# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on 'turbolinks:load', ->
  return unless $('#tag-selector').length > 0

  tagSelector = $('#tag-selector')

  tagSelector.tagsManager({
    hiddenTagListName: 'hook[tags][]',
    prefilled: $('[data-tags]').data('tags')
  })

  $('[name="hook[body]"]').on 'input', ->
    characterCount = $('[name="hook[body]"]').val().length
    $('#hook-text-count').html(characterCount + '/500')
    if characterCount > 500
      $('#hook-text-count').removeClass('text-muted')
      $('#hook-text-count').addClass('text-danger')
    else
      $('#hook-text-count').addClass('text-muted')
      $('#hook-text-count').removeClass('text-danger')

  $.each $('[data-tags]').data('tags'), (index, tag) ->
    $('[data-popular-tag="' + tag + '"]').remove()


  $('[data-popular-tag]').on 'click', (event) ->
    tagSelector.tagsManager('pushTag', event.target.innerText.toLowerCase())
    $(event.target).remove()
