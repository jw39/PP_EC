from flask import request, jsonify
# from flask_restx import Resource
from reco_data import reco_data
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# reco_data 실행하고 data에 저장
data = reco_data()
df_ing_reco, df_ing_effect, df_ing, df_product, df_review, df_user = data.get_data()

class reco_simple():
    def recommend(user_data):
        # print('user_data[나이] : ', user_data['나이'])
        # 추천 정보 DataFrame을 열 단위로 추출
        df_reco = pd.DataFrame(df_ing_reco)
        df_reco = df_reco.T
        df_reco.columns = ['추천1', '추천2', '추천3', '추천4', '추천5']
        
        # 사용자 데이터 변수로 저장
        age = user_data['나이']
        gender = user_data['성별']
        skin_type = user_data['피부타입']
        
        # 사용자 데이터에 맞는 추천 리스트 가져오기
        reco_age = df_reco.loc[age].tolist()
        reco_gender = df_reco.loc[gender].tolist()
        reco_skin_type = df_reco.loc[skin_type].tolist()
        
        # 연령, 성별, 피부타입과 일치하는 추천 리스트 합침
        # 중복 제거 및 필터링 - set() : 자료형 집합, 중복 허용 X, list : set을 다시 list로 감싸 리스트로 변환
        recommend = list(set(reco_age + reco_gender + reco_skin_type))
        
        # 추천 결과 출력
        result_reco=[]
        for i, rec in enumerate(recommend, start=1):
            result_reco.append(f"{rec}")
        # print("추천 효과:")
        # result_reco
        
        ### 추천 성분 매칭
        # 빈 데이터프레임 생성
        df_ing_match = pd.DataFrame()
        df_ing_match_print = pd.DataFrame()
        
        for i in range(len(result_reco)):
            df_ing_match_print[result_reco[i]] = df_ing_effect[result_reco[i]]
        # df_ing_match_print
        
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
        # print('추천 성분 : ', df_ing_match_print)
        # print('추천 화장품 : ', df_result_unique)
        
        
        # 'cos_name' 열의 각 데이터 빈도 계산( 몇 번씩 추천됐는지 ), 내림차순으로
        df_count = df_result['cos_name'].value_counts().sort_values(ascending=False)
        # 결과를 DataFrame으로 변환
        count_sort = df_count.reset_index()
        count_sort.columns = ['cos_name', 'count']
        # 기존 컬럼(df_result)과 결합 (일치하는 kor_name 추가 )
        # df_result_count = df_result.merge(count_sort, on='cos_name')
        
        # 총 비율 계산(내림차순 정렬)
        df_ratio = df_result['cos_name'].value_counts(normalize=True).sort_values(ascending=False)
        # 결과를 DataFrame으로 변환
        ratio_sort = df_ratio.reset_index()
        ratio_sort.columns = ['cos_name', 'ratio']
        # 기존 컬럼(df_result)과 결합 (일치하는 kor_name 추가 )
        # df_result_ratio = df_result.merge(ratio_sort, on='cos_name')

        return df_ratio
    
class reco_cosine():
    def recommend_cosine(user, top_n = 20):
        # print('user : ',user)
        # 피벗 테이블 생성 : 사용자와 제품에 대한 평점
        # -> 모델이 사용할 수 있는 형태로 변경
        matrix = df_review.pivot_table(
            index=['user_nm', 'user_age_group', 'user_sex', 'skin_type'],
            columns='cos_name',
            values='rating').fillna(0)

        # 사용자 간 유사도 계산( 코사인 유사도 )
        cosine_sim_matrix = cosine_similarity(matrix)
        cosine_sim_matrix = pd.DataFrame(cosine_sim_matrix, index=matrix.index, columns=matrix.index)

        user_similarity = cosine_sim_matrix[user]
        
        # 컬럼 하나밖에 없음 -> [:, 0]으로 빼오기
        user_similarity_scores = user_similarity.iloc[:, 0]
        # user_similarity_scores['user_nm']
        
        # 현재 user_similarity_scores는 멀티인덱스임
        # 여기서 user_nm과 value값만 가져오고 싶음
        user_similarity_scores.index # -> 멀티인덱스
        
        # 우선 Series로 변환해줌
        user_similarity_scores = pd.Series(user_similarity_scores.values,
                                        index = user_similarity_scores.index,
                                        name = 'value')
        # user_nm 값만 추출
        user_nm = user_similarity_scores.index.get_level_values('user_nm')
        user_nm
        # value값만 추출( 유사도 점수 )
        value = user_similarity_scores.values
        
        # 유사도 점수, 닉네임만 사용해 Series로 변환 -> 불필요한 user_age_group , user_sex , user_skin_type 컬럼 제거
        user_similarity_scores = pd.DataFrame([user_nm, value]).T
        # 컬럼이름 변경
        user_similarity_scores.columns = ['user_nm', 'value']
        # 본인 제외(유사도 = 1)
        user_similarity_scores = user_similarity_scores[user_similarity_scores['user_nm']!=user]
        user_similarity_scores
        
        # 유사한 사용자들 추출
        # -> 유사도 점수 정렬
        # -> 본인 제외했기 때문에 1 미만 값만 존재할 수 있음
        similar_users = user_similarity_scores.query('value >= 1').sort_values(by = 'value', ascending=True)

        # 정확도 높이기
        i = 99
        while len(similar_users)<=5:
            similar_users = user_similarity_scores.query(f'value >= 0.{i}').sort_values(by = 'value', ascending=True)
            i -= 1
        
        # 비슷한 사용자들의 리뷰 가져오기
        # df_review 데이터프레임에서 user_nm이 similar_users의 user_nm 리스트에 포함된 사람만 필터링
        # -> 한 화장품에 여러 사람이 리뷰를 작성함
        similar_user_ratings = df_review[df_review['user_nm'].isin(similar_users['user_nm'])]
        
        # 필터링한 사용자들의 데이터에서 화장품 이름을 그룹화, rating컬럼의 평균 값을 내림차순으로 정렬
        recommended_cosmetics = similar_user_ratings.groupby('cos_name')['rating'].mean().sort_values(ascending=False)
        
        # 상위 N개의 화장품 추천
        return recommended_cosmetics.head(top_n)