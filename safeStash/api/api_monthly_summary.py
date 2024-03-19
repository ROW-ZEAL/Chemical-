from safeStash.helper import execute_query_and_map_results

def api_aikyam_get_monthly_deposit_history(request):
    monthly_deposit_results = get_monthly_deposit_history(request=request)
    return {
        "monthly_summary": monthly_deposit_results,
    }


def get_monthly_deposit_history(request):
    monthly_deposit_results_query = """ select
                                            sum(amount) as total_amount ,
                                            d.deposit_date
                                        from
                                            deposit d
                                        group by
                                            d.deposit_date ;
                                     """
    return list(execute_query_and_map_results(monthly_deposit_results_query))