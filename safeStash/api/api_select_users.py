import psycopg2
from safeStash.helper import execute_query_and_map_results

def api_select_users(request,id):
    individual_results = api_individual(request, id =id)
    return individual_results
        
    




def api_individual(request, id):
    individual_results_query = """
       select *  from aikyam_finance af WHERE id = %s;
    """
    return list(execute_query_and_map_results(individual_results_query, (id,)))
 


