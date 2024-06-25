import psycopg2
from safeStash.helper import execute_query_and_map_results

def api_aikyam_get_member_list(request):
    member_results = get_aikyam_list(request=request)
    return {
        "members": member_results,
    }


def get_aikyam_list(request):
    members_query = """select * from aikyam_finance ;"""
    return list(execute_query_and_map_results(members_query))