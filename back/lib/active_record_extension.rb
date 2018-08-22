ActiveRecord::ConnectionAdapters::Mysql2Adapter.class_eval do
  def execute_procedure(proc_name, *variables)
    vars = variables.map{ |v| quote(v) }.join(', ')
    response = execute "CALL #{proc_name}(#{vars})", 'Execute Procedure'
    response.each
  ensure
    raw_connection.abandon_results!
  end
end