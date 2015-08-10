$(function() {
  'use strict';
  let kizashi = require('./kizashi');

  let _prevKey = null;

  let _showRelatedTerm = function() {
    let key = $('#search_key').val();
    if (key === _prevKey) {
      return;
    }

    if (key === '') {
      $('#related_term_key').text('検索語を入力してください。');
      $('#related_term').html('');
      return;
    }

    _prevKey = key;
    kizashi.getRelatedTerm('1m', key).done(function(data) {
      let msg = '「' + key + '」の関連語';
      $('#related_term_key').text(msg);

      let html = '';
      let terms = data.terms;
      for (let i = 0, len = terms.length; i < len; i++) {
        // html += terms[i] + '&nbsp;';
        html += '<span class="term">' + terms[i] + '</span>&nbsp;';
      }

      if (html === '') {
        html = '関連語はありません。';
      }
      $('#related_term').html(html);
    });
  };

  let _bindView = function() {
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
      let key = $('#search_key').val().trim();
      $('#search_key').val(key + ' ' + $(this).text());
      _showRelatedTerm();
    });
  };

  $(function() {
    _bindView();
    _showRelatedTerm();
  });

}());
