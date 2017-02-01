window.testEnv.tests.push(function(){

    describe('Login page UI - wrong login', function(){
        let fetchStub;
        let appContainer;
        let errorText = 'some error';

        beforeEach(function(done) {
            document.body.insertAdjacentHTML(
                'afterbegin',
                window.testEnv.helpers.fixture);

            fetchStub = sinon.stub(window, 'fetch', function(url) {
                if (url === '/getUsers') {
                    return window.testEnv.helpers.fakePromise(window.testEnv.helpers.responses.users)
                }
                if (url === '/getTweets') {
                    return window.testEnv.helpers.fakePromise(window.testEnv.helpers.responses.tweets)
                }
                if (url === '/login') {
                    return window.testEnv.helpers.fakePromise({
                        result: 'error', desc: errorText
                    })
                }
            });

            appContainer = $('#app');
            window.initApp();

            window.location.hash = '/login';

            setTimeout(function(){
                done();
            }, 1);
        });

        afterEach(function(done) {
            document.body.removeChild(document.getElementById('app'));
            window.fetch.restore();
            appContainer = undefined;
            window.location.hash = '/';

            setTimeout(function(){
                done();
            }, 1);

        });

        it ('should open login page', function(){
            appContainer.find('.login-form')[0].should.be.instanceOf(HTMLElement);
        });

        it ('should show error under fields', function(done){
            fetchStub.callCount.should.be.equal(2);
            appContainer.find('.login-button').trigger('click');
            fetchStub.callCount.should.be.equal(3);
            fetchStub.lastCall.args[0].should.be.equal('/login');
            setTimeout(()=>{
                appContainer.find('.error-text').text().should.be.equal(errorText);
                done();
            }, 1)
        });
    });

    describe('Login page UI - success login', function(){
        let fetchStub;
        let appContainer;
        let errorText = 'some error';

        beforeEach(function(done) {
            window.localStorage.removeItem('userId');
            document.body.insertAdjacentHTML(
                'afterbegin',
                window.testEnv.helpers.fixture);

            fetchStub = sinon.stub(window, 'fetch', function(url) {
                if (url === '/getUsers') {
                    return window.testEnv.helpers.fakePromise(window.testEnv.helpers.responses.users)
                }
                if (url === '/getTweets') {
                    return window.testEnv.helpers.fakePromise(window.testEnv.helpers.responses.tweets)
                }
                if (url === '/login') {
                    return window.testEnv.helpers.fakePromise({
                        result: 'success', id: '0'
                    })
                }
            });

            appContainer = $('#app');
            window.initApp();

            window.location.hash = '/login';

            setTimeout(function(){
                done();
            }, 1);
        });

        afterEach(function(done) {
            window.localStorage.removeItem('userId');
            document.body.removeChild(document.getElementById('app'));
            window.fetch.restore();
            appContainer = undefined;
            window.location.hash = '/';

            setTimeout(function(){
                done();
            }, 1);
        });

        it ('should show buttons on top', function(done){
            appContainer.find('.login-button').trigger('click');
            setTimeout(()=>{
                appContainer.find('.username-greeting').text().should.be.equal('welcome foo #0');
                done();
            }, 1)
        });
    });
});