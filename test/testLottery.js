//SPDX-License-Identifier: MIT 
const Lottery = artifacts.require("Lottery");
const { expect } = require("chai");

contract('LotteryTest', (accounts) => {
    let lottery;
    let admin, player1, player2, player3;

    before( async () => {        
        lottery = await Lottery.deployed();
    });

    describe('Describing some tests', async() => {
        it('Check correct admin', async () => {
            await Promise.all([
                setUpAdminAndPlayers(accounts),
                lottery.defineAdmin(admin)
            ]);
            expect(await lottery.getAdmin()).to.equal(admin);
        });

        it('Check invalid admin', async () => {
            await Promise.all([
                setUpAdminAndPlayers(accounts),
                lottery.defineAdmin(player1)
            ]);
            expect(await lottery.getAdmin()).to.not.equal(admin);
        });

        it('Check: The administrator cannot participate as a user in the lottery', async function () {
            await Promise.all([
                setUpAdminAndPlayers(accounts),
                lottery.defineAdmin(player1)
            ]);

            let err = null;
            try{
                await lottery.bet([player1,player2])
            }catch(error){
                err = error;
            }
            expect(err.reason)
                .to.be.equal('The administrator cannot participate as a user in the lottery');
        });

        it('Check: A minimum of 3 users is required to participate in the lottery', async function () {
            await Promise.all([
                setUpAdminAndPlayers(accounts),
                lottery.defineAdmin(admin) 
            ]);
            await lottery.bet([player1,player2])
            let err = null;
            try{
                await lottery.pickWinner();
            }catch(error){
                err = error;
            }
            expect(err.reason)
                .to.be.equal('A minimum of 3 users is required to participate in the lottery.');
        });

        it('Enough number of required users to participate in the lottery', async function () {
            await Promise.all([
                setUpAdminAndPlayers(accounts),
                lottery.defineAdmin(admin) 
            ]);
            await lottery.bet([player1,player2, player3]);
            await lottery.pickWinner();
            const {price, roundNumber, dateTime, owner} = await lottery.getLastWinner();
            expect(price).to.be.not.null
            expect(roundNumber).to.be.not.null
            expect(dateTime).to.be.not.null
            expect(owner).to.be.not.null
        });


    });

    //Ordinary functions
    async function setUpAdminAndPlayers(accounts){
        admin = accounts[0];
        player1 = accounts[1];
        player2 = accounts[2];
        player3 = accounts[3];
    }

});

