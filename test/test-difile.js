var chai = require('chai');
chai.config.includeStack = true;
var expect = chai.expect;
var th = require('./testing-helper');
var mf = th.moduleFu;

describe('difile', function() {
    it('should find difile in root.', function() {
        th.deleteDi();

        var di = require('../index')();

        expect(di).to.be.ok;
        expect(di.has('hello')).to.be.true;
        expect(mf.has('./dummy-hello')).to.be.false;

        var svc = di('hello').service;
        expect(mf.has('./dummy-hello')).to.be.true;
        expect(svc.hello()).to.equal('world');
    });

    it('should extend difile in root.', function() {
        th.deleteDi();

        var di = require('../index')();

        expect(di).to.be.ok;
        expect(di.has('hello')).to.be.true;
        expect(mf.has('./dummy-hello')).to.be.false;

        var svc = di('hello').service;
        expect(mf.has('./dummy-hello')).to.be.true;  
        expect(svc.hello()).to.equal('world');

        // act + assert
        di.bind('dummy-service').file('./dummy-service');
        expect(di.has('dummy-service')).to.be.true;
        expect(mf.has('./dummy-service')).to.be.false;

        // act + assert
        var svc = di.get('dummy-service').service;
        expect(mf.has('./dummy-service')).to.be.true;        
        expect(svc).to.be.ok;
        expect(svc.test()).to.equal(123);

        // act + assert
        di.bind().path('./sub/*.js');
        expect(di.has('dummy-foo')).to.be.true;
        expect(mf.has('./sub/dummy-foo')).to.be.false;
        expect(di.has('dummy-bar')).to.be.true;
        expect(mf.has('./sub/dummy-bar')).to.be.false;
        expect(di.has('dummy-data')).to.be.false;

        // act + assert
        var svc = di.get('dummy-foo').service;
        expect(mf.has('./sub/dummy-foo')).to.be.true;        
        expect(svc).to.be.ok;
        expect(svc.foo()).to.equal('bar');

        var Bar = di.get('dummy-bar').Bar;
        var b = new Bar();
        expect(b.add(1, 2)).to.equal(3);       
    });
});