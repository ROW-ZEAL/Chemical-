import psycopg2
from safeStash.helper import execute_query_and_map_results

def api_aikyam_get_deposit_history(request):
    deposit_results = get_deposit_history(request=request)
    return {
        "deposite": deposit_results,
    }


def get_deposit_history(request):
    deposit_results_query = """select
                                    member_id,
                                    first_name,
                                    number,
                                    email,
                                    amount,
                                    deposit_date
                                from
                                    deposit d
                                join aikyam_finance af on
                                    d.member_id = af.id ;
                            """
    return list(execute_query_and_map_results(deposit_results_query))