/**
 * @fileOverview Kizashi API
 */
 $(function() {
  'use strict';

  var kizashi = {
    /**
     * 関連語を取得する
     * @param    {string}   span  '24', '1w' or '1m'
     * @param    {string}   key   Keyword for search
     * @return   {object}         レスポンス
     * @property {string[]} terms 関連語
     */
    getRelatedTerm: function(span, key) {
      let defer = $.Deferred();
      if (this._reqFlag && this._reqId.abort) {
        this._reqId.abort();
      }
      this._reqFlag = true;

      let that = this;
      this._reqId = $.ajax({
        type: 'GET',
        url: 'http://kizasi.jp/kizapi.py',
        data: {
          span: span,
          kw_expr: key,
          type: 'coll'
        }
      }).done(function(data, statusText, jqXHR) {
        let xml = data.results[0];
        let json = $.parseXML(xml);

        let terms = [];
        $(xml).find('channel').find('item').each(function() {
          let item = $(this).text();
          let items = item.split(/\r?\n/g);
          let term = items[1].trim();
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

  module.exports = kizasi;
}())
