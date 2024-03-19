from safeStash.helper import execute_query_and_map_results

def api_aikyam_get_individual_saving(request):
    individual_deposit_results = get_individual_deposit(request=request)
    return {
        "individual_summary": individual_deposit_results,
    }


def get_individual_deposit(request):
    individual_deposit_results_query = """ select
                                            c.first_name,
                                            member_id,
                                            sum(amount) as total_amount,
                                            number,
                                            deposit_date
                                        from
                                            (
                                            select
                                                member_id,
                                                first_name,
                                                number,
                                                email,
                                                amount,
                                                deposit_date
                                            from
                                                deposit d
                                            join aikyam_finance af on
                                                d.member_id = af.id )c
                                        group by
                                            c.first_name ,
                                            c.member_id,
                                            c.number,
                                            c.deposit_date;
                                     """
    return list(execute_query_and_map_results(individual_deposit_results_query))