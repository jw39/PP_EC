import pandas as pd
import numpy as np
from scipy.sparse import load_npz
import os

# 현재 파일의 디렉토리 경로
path = os.path.dirname(os.path.abspath(__file__))

class reco_data:
    # 테스트
    # # 코사인 유사도
    # cosine_sparse_loaded = load_npz(f'{path}/data/cosine_sim_sparse.npz')
    # # 데이터프레임 변환
    # df_cos = pd.DataFrame.sparse.from_spmatrix(cosine_sparse_loaded)
    # # 컬럼명(user_nm)
    # cos_column = pd.read_csv(f'{path}/data/cos_column.csv', encoding='utf-8')
    # # 인덱스 변경
    # df_cos.index = cos_column['user_nm']
    # df_cos.columns = cos_column['user_nm']
    
    # print('df_cos : ', df_cos)
    # user_cos = df_cos.loc[df_cos.index=='!!!'].T
    # abc = user_cos.sort_values(by = '!!!', ascending=False)
    # # print('data, cos_sim : ', user_cos)
    # print('abc : ', abc)

    def __init__(self):
        # 코사인 유사도
        self.cosine_sparse_loaded = load_npz(f'{path}/data/cosine_sim_sparse.npz')
        # 데이터프레임 변환
        self.df_cos = pd.DataFrame.sparse.from_spmatrix(self.cosine_sparse_loaded)
        # 컬럼명(user_nm)
        self.cos_column = pd.read_csv(f'{path}/data/cos_column.csv', encoding='utf-8')
        # 인덱스 변경
        self.df_cos.index = self.cos_column['user_nm']
        self.df_cos.columns = self.cos_column['user_nm']

        # cos_sim = self.df_cos.loc['!!!'][self.df_cos.loc['!!!'].values!=0].sort_values(ascending=False)
        # -> user_nm 넣고이용하면 됨

        # 추천 성분 파일 읽어오기
        self.df_ing_reco = pd.read_csv(f'{path}/data/ing_reco2.csv', encoding='utf-8')
        # self.df_ing_reco.rename(columns={'Unnamed: 0': 'idx'}, inplace=True)
        self.df_ing_reco.set_index('Unnamed: 0', inplace=True)
        # self.df_ing_reco = self.df_ing_reco.drop(columns=['Unnamed: 0'])
        # print(self.df_ing_reco)

        # 성분-효과 파일 읽어오기
        self.df_ing_effect = pd.read_csv(f'{path}/data/ing_effect.csv', encoding='utf-8')
        # print('2 :',self.df_ing_effect)

        # 실제 화장품 성분 읽어오기
        self.df_ing = pd.read_csv(f'{path}/data/result_ingredient.csv', encoding='utf-8')
        self.df_ing= self.df_ing.drop(columns = ['ing_idx', 'eng_name', 'score', 'use',
                                    'risk_none', 'risk_low', 'risk_medium', 'risk_high'])
        # print('3 :',self.df_ing)

        # 화장품 데이터
        self.df_product = pd.read_csv(f'{path}/data/result_product.csv', encoding='utf-8')
        # self.df_product= self.df_product.set_index('idx')
        # print('4 :',self.df_product)

        # 리뷰 파일 읽어오기
        self.df_review = pd.read_csv(f'{path}/data/result_review_all.csv', encoding='utf-8')
        self.df_review = self.df_review.drop(columns = ['review_idx', 'user_age','review'])
        # print('5 :',self.df_review)


        # users 파일 읽어오기
        self.df_user = pd.read_csv(f'{path}/data/result_users.csv', encoding='utf-8')
        # df_user = df_user.drop(columns = ['user_id', 'user_pw', 'user_name', 'user_email', 'user_address'])
        # print('6 :',self.df_user)

        # 나이 -> 연령대 변경
        def categorize_age(age):
            if age < 20:
                return '미성년자'
            elif 20 <= age < 30:
                return '20대'
            elif 30 <= age < 40:
                return '30대'
            elif 40 <= age < 50:
                return '40대'
            else:
                return '50대 이상'
        self.df_user['user_age_group'] = self.df_user['user_age'].apply(categorize_age)

        # 사용할 유저 정보 저장
        self.user = '더무아'
        self.user_data = {
            '나이': self.df_user[self.df_user['user_nm']==self.user]['user_age_group'].values[0],
            '성별': self.df_user[self.df_user['user_nm']==self.user]['user_sex'].values[0],
            '피부타입': self.df_user[self.df_user['user_nm']==self.user]['skin_type'].values[0]
        }
        # print('user : ', self.user)

    def get_data(self):
        # print('user : ', self.user)
        return self.df_ing_reco, self.df_ing_effect, self.df_ing, self.df_product, self.df_review, self.df_user, self.df_cos
    # , self.user, self.user_data
    # print('user : ', __init__, get_data)

    # def test():
        
    #     # os.path.join(base_dir, 'data', 'ing_reco.csv')
    #     a = pd.read_csv(f'{path}/data/ing_reco.csv', encoding='utf-8')
    #     print(a)

    # test()





