using System;
using System.Collections.Generic;
using System.Text;

namespace DaoProvider
{
    public class ContentObject
    {
        
        private string m_strTitle;

        public string Title
        {
            get { return m_strTitle; }
            set { m_strTitle = value; }
        }
        private string m_strContentText;

        public string ContentText
        {
            get { return m_strContentText; }
            set { m_strContentText = value; }
        }
        private string m_strCreator;

        public string Creator
        {
            get { return m_strCreator; }
            set { m_strCreator = value; }
        }

    }
}
