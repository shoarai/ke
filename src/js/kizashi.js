/**
 * @fileOverview Kizashi API
 */
var kizashi = {
  /**
   * 関連語を取得する
   * @param    {string}   span  '24', '1w' or '1m'
   * @param    {string}   key   Keyword for search
   * @return   {object}         レスポンス
   * @property {string[]} terms 関連語
   */
  getRelatedTerm: function(span, key) {
    var defer = $.Deferred();
    if (this._reqFlag && this._reqId.abort) {
      this._reqId.abort();
    }
    this._reqFlag = true;

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

      console.log(key, json, this._reqId, terms);

      defer.resolve({
        terms: terms
      });
    }).always(function() {
      _reqFlag = false;
    });
    return defer.promise();
  },

  _reqId: {},
  _reqFlag: false
};