const  { catchRevert, evenIsDefined} = require("./helpers.js");
const QuizManager = artifacts.require("QuizManager");

contract("QuizManager",  accounts => {

    let instance;
    const [_owner, alice, bob] = accounts;

    before(async () => {
        instance = await QuizManager.new({ from: _owner });
    });

    describe(" Surverys... ", () => {

        it("Should add new survey...",  async() => {
            
            const tx = await instance.addSurvey("responses:{1:a, 2:b, 3:c}", {
                from:alice,
            });

            assert( 
                evenIsDefined(tx.logs)("NewResponse"),
                "Response survey should emit a NewResponse event",
            );

        });

        it("Should send error, survey is not available...",  async() => {

            await catchRevert(
                instance.addSurvey("responses:{1:a, 2:b, 3:c}", {
                    from:alice,
                })
            );
        });
        it("Should send not available...",  async() => {
            
            const tx = await instance.surveyAvailable({
                from:alice,
            });

            assert.equal( 
                tx,
                false,
                "Survey not should available",
            );
        });
        it("Should increment balance...",  async() => {
            
            const tx = await instance.addSurvey("responses:{1:a, 2:b, 3:c}", {
                from:bob,
            });

            assert( 
                evenIsDefined(tx.logs)("Transfer"),
                "Error",
            );

        });
    });
});