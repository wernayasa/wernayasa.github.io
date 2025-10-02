function StorageManipulation(e, t) {
  t = t || "localStorage";
  var i = window,
    n = this;
  if (!(t in i)) return !1;
  this.name = e, this.type = t, this.get = function () {
    var e = n.type,
      t = i[e].getItem(n.name);
    return t ? JSON.parse(t) : []
  }, this.find = function (e, t) {
    for (var i = n.get(), r = {
        items: i
      }, a = 0; a < i.length; a++)
      if (i[a][e] == t) {
        r.item = i[a], r.index = a;
        break
      } return r
  }, this.delete = function (e, t) {
    var r = n.find(e, t),
      a = r.items,
      s = r.index;
    return s >= 0 && (a.splice(s, 1), 0 != a.length ? i[n.type].setItem(n.name, JSON.stringify(a)) : i[n.type].removeItem(n.name)), a
  }, this.add = function (e) {
    var t = n.get();
    if ("object" != typeof e || Array.isArray(e)) return "please insert item object";
    var r = "id" in e ? "id" : Object.keys(e)[0];
    t = n.delete(r, e[r]), t.push(e);
    try {
      i[n.type].setItem(n.name, JSON.stringify(t))
    } catch (e) {
      return console.log(e), e
    }
  }
}