from flask import request, jsonify
from flask_restx import Resource
# from flask_restx import Resource
from reco_data import reco_data
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# reco_data 실행하고 data에 저장
data = reco_data()
df_ing_reco, df_ing_effect, df_ing, df_product, df_review, df_user, df_cos = data.get_data()

class reco_simple(Resource):
    def get(age, sex, skin_type, top_n = 10):
        # 사용자 데이터에 맞는 추천 리스트 가져오기
        reco_age = df_ing_reco.loc[age].tolist()
        reco_gender = df_ing_reco.loc[sex].tolist()
        reco_skin_type = df_ing_reco.loc[skin_type].tolist()

        # 각 추천 리스트 합침
        # 중복 제거 및 필터링
        recommend = list(set(reco_age + reco_gender + reco_skin_type))

        # 추천 효과 저장
        result_reco=[]
        for i, rec in enumerate(recommend, start=1):
            result_reco.append(f"{rec}")
        
        ### 추천 성분 매칭
        # 빈 데이터프레임 생성
        df_ing_match = pd.DataFrame()
        for i in range(len(result_reco)):
            df_ing_match = pd.concat([df_ing_match, df_ing_effect[result_reco[i]]])
        
        # NaN 삭제
        df_ing_match = df_ing_match.dropna()
        # 인덱스 리셋
        df_ing_match = df_ing_match.reset_index(drop=True)
        
        ### 실제 화장품 매칭
        # 실제 화장품의 성분과 맞춤형 화장품 성분이 일치하는 화장품 가져오기
        df_result = pd.DataFrame()
        for i in range(len(result_reco)):
            df_result = pd.concat([df_result, df_ing[df_ing['kor_name']==df_ing_match[0][i]]])
            
        # 인덱스 리셋
        df_result = df_result.reset_index(drop=True)
        
        # 중복 제거
        df_result_unique = df_result.drop_duplicates(subset='cos_name')
        
        # print('추천 효과 : ', result_reco)
        # print('추천 성분 : ', df_ing_match)
        # print('추천 화장품 : ', df_result_unique)

        # 'cos_name' 열의 각 데이터 빈도 계산( 몇 번씩 추천됐는지 )
        df_count = df_result['cos_name'].value_counts().sort_values(ascending=False)
        # 결과를 DataFrame으로 변환
        count_sort = df_count.reset_index()
        count_sort.columns = ['cos_name', 'count']
        
        # 총 비율 계산(내림차순 정렬)
        df_ratio = df_result['cos_name'].value_counts(normalize=True).sort_values(ascending=False)

        # # 상위 10개 반환
        # if len(df_ratio)>=top_n:
        #     df_ratio = df_ratio.head(top_n)

        # 결과를 DataFrame으로 변환
        ratio_sort = df_ratio.reset_index()
        ratio_sort.columns = ['cos_name', 'ratio']

        return df_ratio
    
class reco_cosine(Resource):
    def get(user, top_n = 30):
        # user의 코사인 유사도 정렬
        user_cos = df_cos.loc[df_cos.index==user].T
        user_similarity = user_cos.sort_values(by = user, ascending=False)
        # 본인 제외, 유사한 사용자들 추출
        user_similarity.drop([user], inplace = True)

        # print('cos_sim : ', user_similarity)

        # 유사한 사용자들의 리뷰 가져오기
        sim_review = df_review[df_review['user_nm'].isin(user_similarity.index)]
        reco_cos = sim_review.groupby('cos_name')['rating'].mean().sort_values(ascending=False)
        # print('reco_cos : ', reco_cos)


        # 상위 N개의 화장품 추천
        return reco_cos.head(top_n)
        
