
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Users, TrendingUp } from 'lucide-react';

interface AnswerDisplayProps {
  data: any[];
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">No data loaded yet. Please upload a file or connect to Google Sheets.</p>
        </CardContent>
      </Card>
    );
  }

  // Extract the first 3 questions from the data
  const questions = Object.keys(data[0]).slice(0, 3);
  
  const getAnswerSummary = (questionKey: string) => {
    const answers = data.map(row => row[questionKey]).filter(answer => answer && answer.trim() !== '');
    const answerCounts: { [key: string]: number } = {};
    
    answers.forEach(answer => {
      const cleanAnswer = answer.toString().trim();
      answerCounts[cleanAnswer] = (answerCounts[cleanAnswer] || 0) + 1;
    });
    
    return {
      totalResponses: answers.length,
      uniqueAnswers: Object.keys(answerCounts).length,
      topAnswers: Object.entries(answerCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5),
      allAnswers: answers
    };
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Answer Summary</h2>
        <p className="text-muted-foreground">Displaying responses for the first 3 questions</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="secondary" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {data.length} Total Responses
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {questions.map((question, index) => {
          const summary = getAnswerSummary(question);
          
          return (
            <Card key={question} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      Question {index + 1}
                    </CardTitle>
                    <CardDescription className="text-base font-medium mt-2">
                      {question}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {summary.totalResponses} responses
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {summary.uniqueAnswers <= 10 ? (
                  // Show summary for categorical data
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700">Answer Distribution:</h4>
                    <div className="space-y-2">
                      {summary.topAnswers.map(([answer, count], idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{answer}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{count}</Badge>
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(count / summary.totalResponses) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-12 text-right">
                              {Math.round((count / summary.totalResponses) * 100)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Show individual responses for open-ended questions
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700">All Responses:</h4>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {summary.allAnswers.map((answer, idx) => (
                        <div key={idx} className="p-2 bg-gray-50 rounded border-l-4 border-blue-200">
                          <p className="text-sm">{answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Total Responses: {summary.totalResponses}</span>
                  <span>Unique Answers: {summary.uniqueAnswers}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AnswerDisplay;
