from safeStash.helper import execute_query_and_map_results

def api_aikyam_get_monthly_deposit_history(request):
    monthly_deposit_results = get_monthly_deposit_history(request=request)
    total_deposit_results = get_total_deposit_history(request=request)
    return {
        "monthly_summary": monthly_deposit_results,
        "total_deposit": total_deposit_results,
    }


def get_monthly_deposit_history(request):
    monthly_deposit_results_query = """ SELECT
    SUM(amount) AS total_amount,
    TO_CHAR(d.deposit_date, 'YYYY-MM') AS month
FROM
    deposit d
GROUP BY
    TO_CHAR(d.deposit_date, 'YYYY-MM')
ORDER BY
    TO_CHAR(d.deposit_date, 'YYYY-MM');
                                     """
    return list(execute_query_and_map_results(monthly_deposit_results_query))


def get_total_deposit_history(request):
    total_deposit_results_query = """ select
                                            sum(amount) as total_amount ,max(deposit_date) as date
                                        from
                                            deposit d
                                        ;
                                     """
    return list(execute_query_and_map_results(total_deposit_results_query))