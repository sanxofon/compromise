var test = require('tape');
var nlp = require('../lib/nlp');


test('one big dates', function (t) {
  var r = nlp('six years and 2 days before the start of this next wednesday january 5th 1992 at 6pm');
  var dates = r.dates().data();
  t.equal(dates.length, 1, 'one long date');

  var o = dates[0];
  t.equal(o.punt.direction, 'backward', 'direction');
  t.equal(o.punt.duration.year, 6, 'durationyear');
  t.equal(o.punt.duration.day, 2, 'durationday');
  t.equal(o.section, 'start', 'section');
  t.equal(o.relative.month, 0, 'relativemonth');
  t.equal(o.relative.date, 5, 'relativedate');
  t.equal(o.relative.weekday, 3, 'relativeweekday');
  t.equal(o.relative.year, 1992, 'relativeyear');
  t.equal(o.relative.knownDate, null, 'knowndate');
  // t.equal(o.article, a[1], msg);
  t.end();
});

test('short+long form', function (t) {
  var r = nlp('wednesday, january 2nd, 2016');
  var shorter = r.dates().toShortForm().normal();
  t.equal(shorter, 'wed jan 2nd 2016');

  var r2 = nlp('Thurs, feb 2nd, 2016');
  var longer = r2.dates().toLongForm().normal();
  t.equal(longer, 'thursday february 2nd 2016');
  //
  // var r2 = nlp('Thurs, feb 2nd, 2016')
  // var longer = r2.dates().toLongForm().plaintext()
  // t.equal(longer, 'Thursday, February 2nd, 2016')

  t.end();
});
