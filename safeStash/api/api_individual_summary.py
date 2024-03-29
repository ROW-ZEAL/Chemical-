import psycopg2
from safeStash.helper import execute_query_and_map_results

def api_aikyam_get_individual_deposit_history(request,first_name):
    individual_deposit_results = api_individual_history(request, first_name =first_name)
    return individual_deposit_results
        
    




def api_individual_history(request, first_name):
    individual_history_results_query = """
        SELECT d.*, af.*
        FROM deposit d
        JOIN aikyam_finance af ON d.member_id = af.id
        WHERE first_name = %s
    """
    return list(execute_query_and_map_results(individual_history_results_query, (first_name,)))
 


