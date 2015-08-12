/**
 * @fileOverview kizapi API
 */
 (function(global) {
  'use strict';

  var kizapi = {
    /**
     * 関連語を取得する
     * @param    {string}   key   検索語
     * @param    {string}   span  '24', '1w' or '1m'
     * @return   {object}         レスポンス
     * @property {string[]} terms 関連語
     */
    getRelatedTerms: function(key, span) {
      var defer = $.Deferred();
      if (this._reqFlag && this._reqId.abort) {
        this._reqId.abort();
      }
      this._reqFlag = true;

      var that = this;
      this._reqId = $.ajax({
        type: 'GET',
        url: 'http://kizasi.jp/kizapi.py',
        data: {
          span: span,
          kw_expr: key,
          type: 'coll'
        }
      }).done(function(data, statusText, jqXHR) {
        var xml = data.results[0];
        var json = $.parseXML(xml);

        var terms = [];
        $(xml).find('channel').find('item').each(function() {
          var item = $(this).text();
          var items = item.split(/\r?\n/g);
          var term = items[1].trim();
          terms.push(term);
        });

        defer.resolve({
          terms: terms
        });
      }).always(function() {
        that._reqFlag = false;
      });
      return defer.promise();
    },

    _reqId: {},
    _reqFlag: false
  };

  // if ('process' in global) {
    module.exports = kizapi;
  // }
  // global.kizapi = kizapi;

}((this || 0).self || global));
