from flask import Flask
from flask_restx import Api
from flask_cors import CORS
# from hello import test
from ppMain import ppMainPage, ppCategorySel, ppSuggestAge, ppSuggestSkinType, ppPositiveScore
from ppDetail import ppDetailPage, ppGetReveiw, ppRatingAvg, ppRatingCnt, ppReviewCnt, ppInsertReview,ppGetIngredient
from join import ppJoin
from ppLogin import ppLogin
from ppSearch import ppSearch, ppSearchList
from Test import testJoin, testLogin, testUserData, testOrderData, testCategory, testSearch, testReviewData,testDY
from payment import payment, Clearpayment
from ppCartOrder import ppAddCart, ppOrderCart, ppOrder, ppDeleteCartItems, ppUpdateCartCnt, ppOrderHistoryOne, ppOrderHistory, ppSubscribeHistory
from ppAddress import ppAddressList, ppEditAddress, ppInsertAdd
from recommend import abc, recoIng, skinCheck



app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app) 
app.config['JSON_AS_ASCII'] = False
api = Api(app)



# api.add_resource(test, '/HelloTest')
api.add_resource(ppMainPage, '/MainPage')
api.add_resource(ppDetailPage, '/DetailPage')
api.add_resource(ppJoin, '/JoinPage')
api.add_resource(ppLogin, '/LoginPage')
api.add_resource(ppSearch, '/SearchPage')
api.add_resource(ppSearchList, '/SearchList')
api.add_resource(ppCategorySel, '/CategorySel')
api.add_resource(ppGetReveiw, '/ReviewPage')
api.add_resource(ppRatingAvg, '/RatingAvg') # 기존 ScoreAvg
api.add_resource(ppRatingCnt, '/RatingCnt') # 기존 ScoreCnt
api.add_resource(ppReviewCnt, '/ReviewCnt') 
api.add_resource(ppSuggestAge, '/suggestAge')
api.add_resource(ppSuggestSkinType, '/suggestSkinType')
api.add_resource(ppAddCart, '/AddCart')
api.add_resource(ppOrderCart, '/OrderCart')
api.add_resource(ppOrderHistoryOne, '/OrderHistoryOne')
api.add_resource(ppOrderHistory, '/OrderHistory')
api.add_resource(ppSubscribeHistory, '/SubscribeHistory')
api.add_resource(ppDeleteCartItems, '/DeleteCartItems')
api.add_resource(ppUpdateCartCnt, '/UpdateCartCnt')
api.add_resource(ppOrder, '/OrderPage')
api.add_resource(ppAddressList, '/addressList')
api.add_resource(ppEditAddress, '/EditAddress')
api.add_resource(ppInsertAdd, '/InsertAddress')
api.add_resource(ppInsertReview, '/InsertReview')
api.add_resource(ppGetIngredient, '/GetIngredient')
api.add_resource(ppPositiveScore, '/PositiveScore')

api.add_resource(testJoin, '/TestJoin')
api.add_resource(testLogin, '/TestLogin')
api.add_resource(testUserData, '/TestUserData')
api.add_resource(testOrderData, '/TestOrderData')
api.add_resource(testReviewData, '/TestReviewData')

api.add_resource(testCategory, '/TestCategory')
api.add_resource(testSearch, '/TestSearch')

api.add_resource(testDY, '/TestDY')
api.add_resource(abc, '/Recommend')
api.add_resource(recoIng, '/RecoIng')
api.add_resource(skinCheck, '/SkinCheck')

api.add_resource(payment , "/payment")
api.add_resource(Clearpayment , "/clearpayment")


if __name__ == '__main__':
    app.run('0.0.0.0', port=5002, debug=True)
