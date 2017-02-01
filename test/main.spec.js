window.testEnv.tests.push(function(){

    describe('Default - users list', function(){
        let fetchStub;
        let appContainer;

        describe('Users list page with two users', function(){

            beforeEach(function(done) {
                document.body.insertAdjacentHTML(
                    'afterbegin',
                    window.testEnv.helpers.fixture);

                fetchStub = sinon.stub(window, 'fetch', window.testEnv.helpers.initialStub);

                appContainer = $('#app');
                window.initApp();

                setTimeout(function(){
                    done();
                }, 1);
            });

            afterEach(function() {
                document.body.removeChild(document.getElementById('app'));
                window.fetch.restore();
                appContainer = undefined;
            });

            it('should be two user boxes', function(){
                expect(appContainer.find('.users-card').length).to.equal(2);
            });
        });

        describe('Users list page with no users', function(){

            beforeEach(function(done) {
                window.localStorage.removeItem('userId');
                document.body.insertAdjacentHTML(
                    'afterbegin',
                    window.testEnv.helpers.fixture);

                fetchStub = sinon.stub(window, 'fetch', (url, opts) => {
                    return window.testEnv.helpers.fakePromise(window.testEnv.helpers.responses.empty);

                });

                appContainer = $('#app');
                window.initApp();

                setTimeout(function(){
                    done();
                }, 100);
            });

            afterEach(function(done) {
                document.body.removeChild(document.getElementById('app'));
                window.fetch.restore();
                appContainer = undefined;

                setTimeout(function(){
                    done();
                }, 1);
            });

            it('should be no user boxes', function(){
                expect(appContainer.find('.users-card').length).to.equal(0);
            });
        });
    });

});