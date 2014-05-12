using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using IBatisNet.DataMapper.MappedStatements;
using IBatisNet.DataMapper.Configuration;
using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Scope;
namespace XMLMapfileEditor.EngineCore.DaoService
{
    public abstract class AbstractDaoService
    {
        /// �õ�����ʱibatis.net��̬���ɵ�SQL
        /// </summary>
        /// <param name="sqlMapper"></param>
        /// <param name="statementName"></param>
        /// <param name="paramObject"></param>
        /// <returns></returns>
        public string GetRuntimeSql(ISqlMapper sqlMapper, string statementName, object paramObject)
        {
            string result = string.Empty;
            try
            {
               // sqlMapper.MappedStatements.Keys.GetEnumerator().Current;
                IMappedStatement statement = sqlMapper.GetMappedStatement(statementName);
                if (!sqlMapper.IsSessionStarted)
                {
                    sqlMapper.OpenConnection();
                }
                RequestScope scope = statement.Statement.Sql.GetRequestScope(statement, paramObject, sqlMapper.LocalSession);
              string s =  scope.Statement.Sql.ToString();
                result = scope.PreparedStatement.PreparedSql;
            }
            catch (Exception ex)
            {
                result = "��ȡSQL�������쳣:" + ex.Message;
            }
            return result;
        }
        /// <summary>
        /// ��ȡsqlMap��Ӧstatement������id
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        protected virtual string GetStatementName<T>(string name)
        {
            return string.Format("{0}.{1}", typeof(T).Namespace, name);
        }
        protected ISqlMapper GetMapper()
        {
            try
            {
                String file = HttpContext.Current.Server.MapPath("/Mappers/SqlMap.config");
                DomSqlMapBuilder builder = new DomSqlMapBuilder();

                return builder.Configure(file);
            }
            catch (Exception ex)
            {
                
                throw;
            }
       
            //return Mapper.Instance();
        }
    }
}
