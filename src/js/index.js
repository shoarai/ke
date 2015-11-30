$(function() {
  'use strict';
  var kizapi = require('./kizapi');

  var _prevKey = null;

  var _showRelatedTerm = function() {
    var key = $('#search_key').val();
    if (key === _prevKey) {
      return;
    }

    if (key === '') {
      $('#related_term_key').text('検索語を入力してください。');
      $('#related_term').html('');
      return;
    }

    _prevKey = key;
    kizapi.getRelatedTerms(key, '1m').done(function(data) {
      var msg = '「' + key + '」の関連語';
      $('#related_term_key').text(msg);

      var html = '';
      var terms = data.terms;
      for (var i = 0, len = terms.length; i < len; i++) {
        // html += terms[i] + '&nbsp;';
        html += '<span class="term">' + terms[i] + '</span>&nbsp;';
      }

      if (html === '') {
        html = '関連語はありません。';
      }
      $('#related_term').html(html);
    });
  };

  var _bindView = function() {
    $('#search_form').on('keydown', function(event) {
      // ENTER KEY
      if (event.keyCode === 13) {
        if ($('#search_key').val() === '') {
          event.preventDefault();
          return;
        }
        if (event.ctrlKey) {
          $(this).attr('target', '_blank');
        }
      }
    });

    $('#search_key').on('keyup', function() {
      _showRelatedTerm();
    }).focus();

    $('#clear_search_key').on('click', function() {
      $('#search_key').val('')
        .focus();
      _showRelatedTerm();
    });

    $('#submit_search_key').on('click', function() {
      if ($('#search_key').val() === '') {
        event.preventDefault();
        return;
      }
    });

    $('#related_term').on('click', '.term', function() {
      var key = $('#search_key').val().trim();
      $('#search_key').val(key + ' ' + $(this).text());
      _showRelatedTerm();
    });
  };

  $(function() {
    _bindView();
    _showRelatedTerm();
  });

}());
